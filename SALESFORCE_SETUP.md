# Salesforce Connected App Setup Guide

## Overview
This document outlines the steps to create and configure a Salesforce Connected App for OAuth authentication with your simplified data loader tool.

## Prerequisites
- Salesforce Developer or Production org access
- System Administrator or equivalent permissions
- Basic understanding of OAuth 2.0 flows

## Step 1: Create Connected App

1. **Navigate to Setup**
   - Log into your Salesforce org
   - Click the gear icon (Setup) in top right
   - Search for "App Manager" in Quick Find

2. **Create New Connected App**
   - Click "New Connected App" button
   - Fill in required fields:
     - **Connected App Name**: `Simple Data Loader` (or your preferred name)
     - **API Name**: Auto-generated (e.g., `Simple_Data_Loader`)
     - **Contact Email**: Your email address
     - **Description**: `Simplified tool for importing, exporting, and updating Salesforce data`

3. **Enable OAuth Settings**
   - Check "Enable OAuth Settings"
   - **Callback URL**: `http://localhost:3001/oauth/callback` (for local development)
   - **Selected OAuth Scopes**:
     - `Access the identity URL service (id, profile, email, address, phone)`
     - `Access and manage your data (api)`
     - `Perform requests on your behalf at any time (refresh_token, offline_access)`
     - `Access your basic information (id, profile, email, address, phone)`

4. **Additional Settings**
   - **Require Secret for Web Server Flow**: Keep checked (default)
   - **Require Secret for Refresh Token Flow**: Keep checked (default)
   - **Enable Client Credentials Flow**: Uncheck (not needed)

## Step 2: Configure Security Settings

1. **IP Relaxation** (Optional for development)
   - After creating the app, edit it
   - Set **IP Relaxation** to "Relaxed IP restrictions"
   - This allows development from any IP

2. **OAuth Policies**
   - **Permitted Users**: "All users may self-authorize" (for testing)
   - **Refresh Token Policy**: "Refresh token is valid until revoked"

## Step 3: Retrieve Credentials

After saving the Connected App:

1. **Consumer Key (Client ID)**
   - Copy this value - you'll need it in your application
   - Format: `3MVG9...` (long alphanumeric string)

2. **Consumer Secret (Client Secret)**
   - Click "Click to reveal" to see the secret
   - **IMPORTANT**: Keep this secure and never expose it in client-side code
   - Format: `1234567890...` (numeric string)

## Step 4: Environment Configuration

Create a `.env` file in your project root:

```bash
# Salesforce Connected App Credentials
SALESFORCE_CLIENT_ID=your_consumer_key_here
SALESFORCE_CLIENT_SECRET=your_consumer_secret_here
SALESFORCE_CALLBACK_URL=http://localhost:3001/oauth/callback

# Salesforce Environment
SALESFORCE_LOGIN_URL=https://login.salesforce.com  # For production
# SALESFORCE_LOGIN_URL=https://test.salesforce.com  # For sandbox

# Application Settings
PORT=3001
SESSION_SECRET=your_random_session_secret_here
```

## Step 5: API Permissions Required

Your Connected App needs these permissions for the data loader:

### Core Permissions:
- **API Access**: Read/write data via REST/Bulk APIs
- **Identity URL Access**: Get user information
- **Refresh Token**: Maintain authentication

### Object Permissions:
The user authenticating must have:
- **Read/Write** permissions on target objects (Account, Contact, etc.)
- **Modify All Data** permission (for bulk operations)
- **API Enabled** permission

## Step 6: Testing Authentication Flow

### OAuth 2.0 Authorization Code Flow:

1. **Authorization Request**:
   ```
   GET https://login.salesforce.com/services/oauth2/authorize?
     response_type=code&
     client_id=YOUR_CONSUMER_KEY&
     redirect_uri=http://localhost:3001/oauth/callback&
     scope=api refresh_token
   ```

2. **Token Exchange**:
   ```
   POST https://login.salesforce.com/services/oauth2/token
   Content-Type: application/x-www-form-urlencoded
   
   grant_type=authorization_code&
   client_id=YOUR_CONSUMER_KEY&
   client_secret=YOUR_CONSUMER_SECRET&
   redirect_uri=http://localhost:3001/oauth/callback&
   code=AUTHORIZATION_CODE_FROM_STEP_1
   ```

3. **Expected Response**:
   ```json
   {
     "access_token": "00D...",
     "refresh_token": "5Aep...",
     "instance_url": "https://yourinstance.my.salesforce.com",
     "id": "https://login.salesforce.com/id/...",
     "token_type": "Bearer",
     "issued_at": "1640995200000",
     "signature": "..."
   }
   ```

## Step 7: Production Considerations

### Security:
- Use HTTPS callback URLs in production
- Store secrets securely (environment variables, not code)
- Implement proper token refresh logic
- Consider token encryption for storage

### Callback URLs:
- Development: `http://localhost:3001/oauth/callback`
- Production: `https://yourdomain.com/oauth/callback`

### IP Restrictions:
- Set specific IP ranges for production apps
- Use "Admin approved users are pre-authorized" for better security

## Common Issues and Solutions

### Issue: "invalid_client_id" Error
**Solution**: Double-check the Consumer Key in your environment variables

### Issue: "redirect_uri_mismatch" Error
**Solution**: Ensure callback URL in code exactly matches Connected App settings

### Issue: "insufficient_scope" Error
**Solution**: Add required OAuth scopes in Connected App configuration

### Issue: User Cannot Authorize
**Solution**: Check user permissions and Connected App policies

## Next Steps

Once your Connected App is configured:
1. Test OAuth flow with a simple script
2. Implement token refresh logic
3. Build your application's authentication layer
4. Test with Salesforce Bulk API calls

## Resources

- [Salesforce Connected App Documentation](https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm)
- [OAuth 2.0 Authorization Code Flow](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_web_server_flow.htm)
- [Bulk API 2.0 Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/)