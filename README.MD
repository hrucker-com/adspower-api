# adspower-api

## Overview

adspower-api is a TypeScript/JavaScript module for interacting with the AdsPower Local API. It allows you to manage browser profiles, groups, and extensions programmatically.

## Installation

To use this module, include it in your project:

```sh
npm install --save ads-power-local-api
```

or

```sh
yarn add ads-power-local-api
```

## Usage

```ts
import AdsPowerLocalAPI from "ads-power-local-api";

const api = new AdsPowerLocalAPI(50325); // Default port is 50325

// Check API status
api.API.status().then(console.log).catch(console.error);

// Start a browser profile
api.Browser.start("your_profile_id").then(console.log).catch(console.error);

// Stop a browser profile
api.Browser.stop("your_profile_id").then(console.log).catch(console.error);

// Create a new group
api.Groups.create("New Group", "This is a test group")
    .then(console.log)
    .catch(console.error);

// List profiles
api.Profiles.list({ page: 1, page_size: 10 })
    .then(console.log)
    .catch(console.error);
```

## Features

- **API Status**: Check AdsPower API availability.
- **Browser Management**: Start, stop, and check the status of browser profiles.
- **Group Management**: Create, edit, and list profile groups.
- **Profile Management**: Create, update, list, delete, and move browser profiles.
- **Extensions Management**: Retrieve extension category lists.

## Methods

### API

- `API.status(): Promise<any>` - Checks the connection status of the AdsPower API.

### Browser Management

- `Browser.start(identifier: string | number, options?: object): Promise<any>` - Starts a browser profile.
- `Browser.stop(identifier: string | number): Promise<any>` - Stops a browser profile.
- `Browser.status(identifier: string | number): Promise<any>` - Checks the status of a browser profile.

### Group Management

- `Groups.create(groupName: string, remark?: string): Promise<any>` - Creates a new profile group.
- `Groups.edit(groupId: string, newGroupName: string, remark?: string): Promise<any>` - Updates group information.
- `Groups.list(groupName?: string, page?: number, pageSize?: number): Promise<any>` - Retrieves group information.

### Profile Management

- `Profiles.new(profileData: object): Promise<any>` - Creates a new browser profile.
- `Profiles.update(profileId: string, profileData: object): Promise<any>` - Updates an existing profile.
- `Profiles.list(params: object): Promise<any>` - Retrieves profile information.
- `Profiles.delete(profileIds: string[]): Promise<any>` - Deletes profiles.
- `Profiles.regroup(profileIds: string[], groupId: string): Promise<any>` - Moves profiles to another group.
- `Profiles.clearAllCache(): Promise<any>` - Clears locally cached browser data.

### Extensions Management

- `Extensions.getCategoryList(page?: number, pageSize?: number): Promise<any>` - Retrieves extension categories.

## License

This project is licensed under the MIT License.

