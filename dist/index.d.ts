declare namespace AdsPowerInterface {
    interface user_proxy_config {
        /** Proxy provider or type */
        proxy_soft: 'brightdata' | 'brightauto' | 'oxylabsauto' | '922S5auto' | 'ipideaauto' | 'ipfoxyauto' | '922S5auth' | 'kookauto' | 'ssh' | 'other' | 'noproxy';
        /** Optional. The type of proxy ('http', 'https', 'socks5'). */
        proxy_type?: 'http' | 'https' | 'socks5';
        /** Optional. The proxy server address. */
        proxy_host?: string;
        /** Optional. The proxy server port. */
        proxy_port?: string;
        /** Optional. The username for proxy authentication. */
        proxy_user?: string;
        /** Optional. The password for proxy authentication. */
        proxy_password?: string;
        /** Optional. The full proxy URL if applicable. */
        proxy_url?: string;
        /** Optional. Configuration string for global proxy settings. */
        global_config?: string;
    }
    interface cookie {
        /** The domain to which the cookie belongs. */
        domain: string;
        /** Optional. The expiration timestamp of the cookie. */
        expirationDate?: number;
        /** The name of the cookie. */
        name: string;
        /** The path for which the cookie is valid. */
        path: string;
        /** Optional. The SameSite policy of the cookie. */
        sameSite?: string;
        /** Optional. Indicates whether the cookie is secure. */
        secure?: boolean;
        /** The value of the cookie. */
        value: string;
        /** Optional. A unique identifier for the cookie. */
        id?: number;
    }
    interface fingerprint_config {
        /** Timezone setting: "1" for automatic based on IP, "0" for custom. */
        automatic_timezone?: "1" | "0";
        /** Custom timezone, empty string "" represents local timezone by default. */
        timezone?: string;
        /** WebRTC settings: "forward", "proxy", "local", or "disabled". */
        webrtc?: "forward" | "proxy" | "local" | "disabled";
        /** Location request setting: "ask", "allow", or "block". */
        location?: "ask" | "allow" | "block";
        /** Location switch: "1" for automatic based on IP, "0" for custom. */
        location_switch?: "1" | "0";
        /** Longitude for designated location (-180 to 180, 6 decimal places). */
        longitude?: `${number}`;
        /** Latitude for designated location (-90 to 90, 6 decimal places). */
        latitude?: `${number}`;
        /** Accuracy of location in meters (10-5000). */
        accuracy?: `${10 | 100 | 1000 | 5000}`;
        /** Browser language settings as an array of strings. */
        language?: string[];
        /** Language switch: "1" for based on IP country, "0" for off. */
        language_switch?: "1" | "0";
        /** Page language switch: "1" for enabled, "0" for disabled. */
        page_language_switch?: "1" | "0";
        /** Page language setting, defaults to "native" or custom country code. */
        page_language?: "native" | string;
        /** Custom user-agent string. */
        ua?: string;
        /** Screen resolution setting: "none", "random", or custom width_height. */
        screen_resolution?: "none" | "random" | `${number}_${number}`;
        /** List of fonts used in the browser. */
        fonts?: string[];
        /** Canvas fingerprint switch: "1" for noise, "0" for default. */
        canvas?: "1" | "0";
        /** WebGL image fingerprint switch: "1" for noise, "0" for default. */
        webgl_image?: "1" | "0";
        /** WebGL metadata fingerprint switch: "0" for default, "2" for custom, "3" for random. */
        webgl?: "0" | "2" | "3";
        /** WebGL configuration settings. */
        webgl_config?: {
            unmasked_vendor?: string;
            unmasked_renderer?: string;
            webgpu?: {
                webgpu_switch?: "0" | "1" | "2";
            };
        };
        /** Audio fingerprint switch: "1" for noise, "0" for off. */
        audio?: "1" | "0";
        /** Do Not Track setting: "default", "true", or "false". */
        do_not_track?: "default" | "true" | "false";
        /** Number of CPU cores: "2", "4", "6", "8", "16", or "default". */
        hardware_concurrency?: "2" | "4" | "6" | "8" | "16" | "default";
        /** Device memory setting: "2", "4", "6", "8", or "default". */
        device_memory?: "2" | "4" | "6" | "8" | "default";
        /** Flash setting: "allow" or "block". */
        flash?: "allow" | "block";
        /** Port scan protection: "1" for enabled, "0" for disabled. */
        scan_port_type?: "1" | "0";
        /** List of allowed ports for scanning. */
        allow_scan_ports?: string[];
        /** Media device switch: "0" for off, "1" for noise (local), "2" for custom. */
        media_devices?: "0" | "1" | "2";
        /** Number of media devices: audioinput, videoinput, and audiooutput. */
        media_devices_num?: {
            audioinput_num?: `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
            videoinput_num?: `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
            audiooutput_num?: `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
        };
        /** ClientRects fingerprint switch: "1" for noise, "0" for default. */
        client_rects?: "1" | "0";
        /** Device name switch: "0" for off, "1" for masked, "2" for custom. */
        device_name_switch?: "0" | "1" | "2";
        /** Custom device name. */
        device_name?: string;
        /** Random user-agent configuration. */
        random_ua?: {
            ua_browser?: ("chrome" | "firefox")[];
            ua_version?: string[];
            ua_system_version?: string[];
        };
        /** SpeechVoices setting: "0" for default, "1" for replaced. */
        speech_switch?: "0" | "1";
        /** MAC address configuration. */
        mac_address_config?: {
            model?: "0" | "1" | "2";
            address?: string;
        };
        /** Browser kernel configuration. */
        browser_kernel_config?: {
            version?: "92" | "99" | "102" | "105" | "108" | "111" | "ua_auto";
            type?: "chrome" | "firefox";
        };
        /** GPU setting: "0" for default, "1" for hardware acceleration, "2" for off. */
        gpu?: "0" | "1" | "2";
        /** TLS switch: "0" for disabled, "1" for enabled. */
        tls_switch?: "0" | "1";
        /** TLS settings with hexadecimal values separated by commas. */
        tls?: string;
    }
}
declare class AdsPowerLocalAPI {
    private baseUrl;
    private basePath;
    /**
     * Creates an instance of AdsPowerAPI.
     * @param {number} [apiPort=50325] - The port on which AdsPower local API is running.
     */
    constructor(apiPort?: number);
    API: {
        /**
         * Checks the connection status of the AdsPower API.
         * @returns {Promise<any>} The API response.
         */
        status: () => Promise<any>;
    };
    Profiles: {
        /**
         * Starts a browser.
         * @param identifier - Profile identifier (string user_id or numeric serial_number).
         * @param options - Optional parameters for browser startup.
         * @returns A promise resolving with the response data.
         */
        start: (identifier: string | number, options?: {
            serialNumber?: string;
            openTabs?: number;
            ipTab?: number;
            newFirstTab?: number;
            launchArgs?: string[];
            headless?: number;
            disablePasswordFilling?: number;
            clearCacheAfterClosing?: number;
            enablePasswordSaving?: number;
            cdpMask?: number;
            deviceScale?: number;
        }) => Promise<any>;
        /**
         * Stops the browser.
         * @param identifier - Profile identifier (string user_id or numeric serial_number).
         * @returns Promise with the server response.
         */
        stop: (identifier: string | number) => Promise<any>;
        /**
         * Checks the status of a browser.
         * @param identifier - Profile identifier (string user_id or numeric serial_number).
         * @returns {Promise<any>} The API response.
         */
        status: (identifier: string | number) => Promise<any>;
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
         * @param profileData.user_proxy_config - Optional. The user's proxy configuration.
         * @param profileData.proxyid - Optional. The proxy ID or "random" to randomize a proxy.
         * @param profileData.fingerprint_config - Required. An object containing fingerprint configuration details.
         * @returns A promise resolving to the response data, including the unique profile ID upon successful creation.
         */
        new: (profileData: {
            name?: string;
            domain_name?: string;
            open_urls?: string[];
            repeat_config?: number[];
            username?: string;
            password?: string;
            fakey?: string;
            cookie?: AdsPowerInterface.cookie[];
            ignore_cookie_error?: number;
            group_id: string;
            ip?: string;
            country?: string;
            region?: string;
            city?: string;
            remark?: string;
            ipchecker?: string;
            sys_app_cate_id?: number;
            user_proxy_config?: AdsPowerInterface.user_proxy_config;
            proxyid?: string;
            fingerprint_config: AdsPowerInterface.fingerprint_config;
        }) => Promise<any>;
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
         * @param profileData.user_proxy_config - Optional. The user's proxy configuration.
         * @param profileData.proxyid - Optional. The proxy ID or "random" to randomize a proxy.
         * @param profileData.fingerprint_config - Optional. An object containing fingerprint configuration details.
         * @returns A promise resolving to the response data.
         */
        update: (profileId: string, profileData: {
            name?: string;
            domain_name?: string;
            open_urls?: string[];
            username?: string;
            password?: string;
            fakey?: string;
            cookie?: AdsPowerInterface.cookie[];
            ignore_cookie_error?: number;
            ip?: string;
            country?: string;
            region?: string;
            city?: string;
            remark?: string;
            sys_app_cate_id?: number;
            user_proxy_config?: AdsPowerInterface.user_proxy_config;
            proxyid?: string;
            fingerprint_config: AdsPowerInterface.fingerprint_config;
        }) => Promise<any>;
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
        list: (params: {
            group_id?: string;
            user_id?: string;
            serial_number?: string;
            user_sort?: {
                [key: string]: "asc" | "desc";
            };
            page?: number;
            page_size?: number;
        }) => Promise<any>;
        /**
         * Deletes one or more browser profiles by their unique identifiers.
         * @param profileIds - An array of profile IDs to be deleted. Maximum of 100 IDs per request.
         * @returns A promise resolving to the response data indicating success or failure.
         */
        delete: (profileIds: string[]) => Promise<any>;
        /**
         * Moves one or more browser profiles to a specified group.
         * @param profileIds - An array of profile IDs to be moved. Format: ["id1", "id2", "id3"].
         * @param groupId - The ID of the target group to which the profiles will be moved.
         * @returns A promise resolving to the response data indicating success or failure.
         */
        regroup: (profileIds: string[], groupId: string) => Promise<any>;
        /**
         * Clears all locally cached data generated by open browsers.
         * @returns A promise resolving to the response data indicating success or failure.
         */
        clearAllCache: () => Promise<any>;
    };
    Groups: {
        /**
         * Creates a new profile group.
         * @param groupName - The unique name of the new group.
         * @param remark - Optional notes for the group.
         * @returns A promise resolving to the response data.
         */
        create: (groupName: string, remark?: string) => Promise<any>;
        /**
         * Updates the specified profile group's information.
         * @param groupId - The ID of the group to be edited.
         * @param newGroupName - The new unique name for the group.
         * @param remark - Optional notes for the group (requires v2.6.7.2 or higher).
         * @returns A promise resolving to the response data.
         */
        edit: (groupId: string, newGroupName: string, remark?: string) => Promise<any>;
        /**
         * Retrieves information about profile groups.
         * @param groupName - Optional. The name of the group to search for. If omitted, all groups are retrieved.
         * @param page - Optional. The page number to retrieve, starting from 1. Default is 1.
         * @param pageSize - Optional. The number of records per page, with a maximum of 2000. Default is 10.
         * @returns A promise resolving to the response data.
         */
        list: (groupName?: string, page?: number, pageSize?: number) => Promise<any>;
    };
    Extensions: {
        /**
         * Gets the list of extension categories.
         * @param {number} [page=1] - The page number.
         * @param {number} [pageSize=10] - The number of results per page.
         * @returns {Promise<any>} The API response.
         */
        list: (page?: number, pageSize?: number) => Promise<any>;
    };
    /**
     * Sends an HTTP request to the AdsPower API.
     * @param {string} endpoint - The API endpoint.
     * @param {string} method - The HTTP method (GET or POST).
     * @param {Record<string, any>} [data={}] - The request payload.
     * @returns {Promise<any>} The API response.
     * @private
     */
    private _sendRequest;
}
export default AdsPowerLocalAPI;
