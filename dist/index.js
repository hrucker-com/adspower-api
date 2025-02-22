"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AdsPowerLocalAPI {
    /**
     * Creates an instance of AdsPowerAPI.
     * @param {number} [apiPort=50325] - The port on which AdsPower local API is running.
     */
    constructor(apiPort = 50325) {
        // General API Management
        this.API = {
            /**
             * Checks the connection status of the AdsPower API.
             * @returns {Promise<any>} The API response.
             */
            status: () => this._sendRequest('/status', 'GET'),
        };
        // Browser Management
        this.Browser = {
            /**
             * Starts a browser.
             * @param identifier - Profile identifier (string user_id or numeric serial_number).
             * @param options - Optional parameters for browser startup.
             * @returns A promise resolving with the response data.
             */
            start: (identifier, options = {}) => {
                const params = new URLSearchParams();
                params.append(typeof identifier === 'string' ? 'user_id' : 'serial_number', `${identifier}`);
                Object.keys(options).forEach((key) => {
                    const value = options[key];
                    if (value !== undefined) {
                        params.append(key, Array.isArray(value) ? value.join(',') : String(value));
                    }
                });
                return this._sendRequest(`${this.basePath}browser/start`, 'GET', params);
            },
            /**
             * Stops the browser.
             * @param identifier - Profile identifier (string user_id or numeric serial_number).
             * @returns Promise with the server response.
             */
            stop: (identifier) => {
                const paramType = typeof identifier === 'string' ? 'user_id' : 'serial_number';
                return this._sendRequest(`${this.basePath}browser/stop`, 'GET', { [paramType]: identifier });
            },
            /**
             * Checks the status of a browser.
             * @param identifier - Profile identifier (string user_id or numeric serial_number).
             * @returns {Promise<any>} The API response.
             */
            status: (identifier) => {
                const paramType = typeof identifier === 'string' ? 'user_id' : 'serial_number';
                return this._sendRequest(`${this.basePath}browser/active`, 'GET', { [paramType]: identifier });
            },
        };
        // Group Management
        this.Groups = {
            /**
             * Creates a new profile group.
             * @param groupName - The unique name of the new group.
             * @param remark - Optional notes for the group.
             * @returns A promise resolving to the response data.
             */
            create: (groupName, remark) => {
                const payload = { group_name: groupName };
                if (remark)
                    payload.remark = remark;
                return this._sendRequest(`${this.basePath}group/create`, 'POST', payload);
            },
            /**
             * Updates the specified profile group's information.
             * @param groupId - The ID of the group to be edited.
             * @param newGroupName - The new unique name for the group.
             * @param remark - Optional notes for the group (requires v2.6.7.2 or higher).
             * @returns A promise resolving to the response data.
             */
            edit: (groupId, newGroupName, remark) => {
                const payload = {
                    group_id: groupId,
                    group_name: newGroupName,
                };
                if (remark)
                    payload.remark = remark;
                return this._sendRequest(`${this.basePath}group/update`, 'POST', payload);
            },
            /**
             * Retrieves information about profile groups.
             * @param groupName - Optional. The name of the group to search for. If omitted, all groups are retrieved.
             * @param page - Optional. The page number to retrieve, starting from 1. Default is 1.
             * @param pageSize - Optional. The number of records per page, with a maximum of 2000. Default is 10.
             * @returns A promise resolving to the response data.
             */
            list: (groupName, page = 1, pageSize = 10) => {
                const params = { page, page_size: pageSize };
                if (groupName)
                    params.group_name = groupName;
                return this._sendRequest(`${this.basePath}group/list`, 'GET', params);
            },
        };
        // Extensions Management
        this.Extensions = {
            /**
             * Gets the list of extension categories.
             * @param {number} [page=1] - The page number.
             * @param {number} [pageSize=10] - The number of results per page.
             * @returns {Promise<any>} The API response.
             */
            getCategoryList: (page = 1, pageSize = 10) => this._sendRequest(`${this.basePath}application/list`, 'GET', { page, page_size: pageSize }),
        };
        // Profile Management
        this.Profiles = {
            /**
             * Creates a new browser profile with the specified configuration.
             * @param profileData - An object containing the profile configuration.
             * @param profileData.name - Optional. The name of the profile, up to 100 characters.
             * @param profileData.domain_name - Optional. The domain name of the user's account platform (e.g., "facebook.com").
             * @param profileData.open_urls - Optional. An array of URLs to open when the browser starts. Defaults to the domain_name if not provided.
             * @param profileData.repeat_config - Optional. Account deduplication settings. Default is [0].
             *   - 0: Allow duplication
             *   - 2: Deduplication based on account name/password
             *   - 3: Deduplication based on cookie
             *   - 4: Deduplication based on c_user (specific to Facebook)
             * @param profileData.username - Optional. The username for the account. Required if password or cookie is provided.
             * @param profileData.password - Optional. The password for the account. Required if username is provided.
             * @param profileData.fakey - Optional. The 2FA key for online 2FA code generation.
             * @param profileData.cookie - Optional. An array of cookie objects associated with the account.
             * @param profileData.ignore_cookie_error - Optional. Set to 1 to ignore cookie verification errors. Default is 0.
             * @param profileData.group_id - Required. The ID of the group to which the profile belongs.
             * @param profileData.ip - Optional. The proxy IP used for account login. Required for specific proxy software.
             * @param profileData.country - Optional. The country code associated with the proxy IP.
             * @param profileData.region - Optional. The state or province associated with the proxy IP.
             * @param profileData.city - Optional. The city associated with the proxy IP.
             * @param profileData.remark - Optional. Remarks or notes about the profile.
             * @param profileData.ipchecker - Optional. The IP query service to use ("ip2location" or "ipapi").
             * @param profileData.sys_app_cate_id - Optional. Application category ID. Default is 0.
             * @param profileData.user_proxy_config - Optional. An object containing proxy configuration details.
             *   - proxy_type: The type of proxy ("http", "socks5", etc.).
             *   - proxy_host: The proxy host address.
             *   - proxy_port: The proxy port number.
             *   - proxy_user: Optional. The username for proxy authentication.
             *   - proxy_password: Optional. The password for proxy authentication.
             *   - proxy_soft: Optional. The proxy software used (e.g., "luminati").
             * @param profileData.proxyid - Optional. The proxy ID or "random" to randomize a proxy.
             * @param profileData.fingerprint_config - Required. An object containing fingerprint configuration details.
             *   - automatic_timezone: "1" to enable automatic timezone detection.
             *   - language: An array of language codes (e.g., ["en-US", "en"]).
             *   - flash: Flash settings ("block", "allow", etc.).
             *   - fonts: An array specifying font settings (e.g., ["all"]).
             *   - webrtc: WebRTC settings ("disabled", "enabled", etc.).
             *   - ua: The User-Agent string for the browser.
             * @returns A promise resolving to the response data, including the unique profile ID upon successful creation.
             */
            new: (profileData) => {
                return this._sendRequest(`${this.basePath}user/create`, 'POST', profileData);
            },
            /**
             * Updates the specified browser profile with the provided data.
             * @param profileId - The unique identifier of the profile to be updated.
             * @param profileData - An object containing the profile configuration to be updated.
             * @param profileData.name - Optional. The name of the profile, up to 100 characters.
             * @param profileData.domain_name - Optional. The domain name of the user's account platform (e.g., "facebook.com").
             * @param profileData.open_urls - Optional. An array of URLs to open when the browser starts. Defaults to the domain_name if not provided.
             * @param profileData.username - Optional. The username for the account. Required if password or cookie is provided.
             * @param profileData.password - Optional. The password for the account. Required if username is provided.
             * @param profileData.fakey - Optional. The 2FA key for online 2FA code generation.
             * @param profileData.cookie - Optional. An array of cookie objects associated with the account.
             * @param profileData.ignore_cookie_error - Optional. Set to 1 to ignore cookie verification errors. Default is 0.
             * @param profileData.ip - Optional. The proxy IP used for account login. Required for specific proxy software.
             * @param profileData.country - Optional. The country code associated with the proxy IP.
             * @param profileData.region - Optional. The state or province associated with the proxy IP.
             * @param profileData.city - Optional. The city associated with the proxy IP.
             * @param profileData.remark - Optional. Remarks or notes about the profile.
             * @param profileData.sys_app_cate_id - Optional. Application category ID. Default is 0.
             * @param profileData.user_proxy_config - Optional. An object containing proxy configuration details.
             *   - proxy_type: The type of proxy ("http", "socks5", etc.).
             *   - proxy_host: The proxy host address.
             *   - proxy_port: The proxy port number.
             *   - proxy_user: Optional. The username for proxy authentication.
             *   - proxy_password: Optional. The password for proxy authentication.
             *   - proxy_soft: Optional. The proxy software used (e.g., "luminati").
             * @param profileData.proxyid - Optional. The proxy ID or "random" to randomize a proxy.
             * @param profileData.fingerprint_config - Optional. An object containing fingerprint configuration details.
             *   - automatic_timezone: "1" to enable automatic timezone detection.
             *   - language: An array of language codes (e.g., ["en-US", "en"]).
             *   - flash: Flash settings ("block", "allow", etc.).
             *   - fonts: An array specifying font settings (e.g., ["all"]).
             *   - webrtc: WebRTC settings ("disabled", "enabled", etc.).
             *   - ua: The User-Agent string for the browser.
             * @returns A promise resolving to the response data.
             */
            update: (profileId, profileData) => {
                return this._sendRequest(`${this.basePath}user/update`, 'POST', Object.assign({ user_id: profileId }, profileData));
            },
            /**
             * Retrieves information about created profiles.
             * @param params - An object containing query parameters to filter the profiles.
             * @param params.group_id - Optional. Filter profiles by group ID. If omitted, all groups are searched.
             * @param params.user_id - Optional. Filter profiles by profile ID.
             * @param params.serial_number - Optional. Filter profiles by serial number.
             * @param params.user_sort - Optional. Sort the query results. Supports sorting by 'serial_number', 'last_open_time', or 'created_time' in 'asc' or 'desc' order. Example: {"serial_number":"desc"}.
             * @param params.page - Optional. The page number to retrieve, starting from 1. Default is 1.
             * @param params.page_size - Optional. The number of records per page, with a maximum of 100. Default is 1.
             * @returns A promise resolving to the response data containing the list of profiles and pagination details.
             */
            list: (params) => {
                const queryString = new URLSearchParams(params).toString();
                return this._sendRequest(`${this.basePath}user/list`, 'GET', params);
            },
            /**
             * Deletes one or more browser profiles by their unique identifiers.
             * @param profileIds - An array of profile IDs to be deleted. Maximum of 100 IDs per request.
             * @returns A promise resolving to the response data indicating success or failure.
             */
            delete: (profileIds) => {
                return this._sendRequest(`${this.basePath}user/delete`, 'POST', {
                    user_ids: profileIds,
                });
            },
            /**
             * Moves one or more browser profiles to a specified group.
             * @param profileIds - An array of profile IDs to be moved. Format: ["id1", "id2", "id3"].
             * @param groupId - The ID of the target group to which the profiles will be moved.
             * @returns A promise resolving to the response data indicating success or failure.
             */
            regroup: (profileIds, groupId) => {
                return this._sendRequest(`${this.basePath}user/regroup`, 'POST', {
                    user_ids: profileIds,
                    group_id: groupId,
                });
            },
            /**
             * Clears all locally cached data generated by open browsers.
             * @returns A promise resolving to the response data indicating success or failure.
             */
            clearAllCache: () => {
                return this._sendRequest(`${this.basePath}/api/v1/user/delete-cache`, 'POST');
            },
        };
        this.baseUrl = `http://localhost:${apiPort}`;
        this.basePath = `/api/v1/`;
    }
    /**
     * Sends an HTTP request to the AdsPower API.
     * @param {string} endpoint - The API endpoint.
     * @param {string} method - The HTTP method (GET or POST).
     * @param {Record<string, any>} [data={}] - The request payload.
     * @returns {Promise<any>} The API response.
     * @private
     */
    _sendRequest(endpoint_1, method_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, method, data = {}) {
            let url = `${this.baseUrl}${endpoint}`;
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            if (method === 'POST') {
                options.body = JSON.stringify(data);
            }
            else if (method === 'GET') {
                const queryParams = new URLSearchParams(data).toString();
                url += `?${queryParams}`;
            }
            const response = yield fetch(url, options);
            return response.json();
        });
    }
}
exports.default = AdsPowerLocalAPI;
module.exports = AdsPowerLocalAPI;
