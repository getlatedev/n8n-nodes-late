# n8n-nodes-late

![LATE Logo](https://raw.githubusercontent.com/getlatedev/n8n-nodes-late/main/late/late-logo.svg)

An n8n community node for the [LATE API](https://getlate.dev) - the professional social media management platform.

**Schedule and manage social media posts across multiple platforms:**
- 🐦 **Twitter/X** - Posts, threads, and automation
- 📸 **Instagram** - Posts, Stories, Reels with Business account support
- 👤 **Facebook** - Page management and posting
- 💼 **LinkedIn** - Personal and company page posting
- 🎵 **TikTok** - Direct video posting with privacy controls
- 📹 **YouTube** - Videos and Shorts with custom thumbnails
- 🧵 **Threads** - Meta's social platform

## Version History

- **1.0.0** - Initial release with comprehensive LATE API integration

## Installation

### From n8n Community Nodes Panel (Recommended)

1. Go to **Settings** → **Community Nodes** in your n8n instance
2. Select **Install** and enter `n8n-nodes-late`
3. Click **Install** and restart n8n
4. The LATE node will appear in your node palette

### From npm

```bash
npm install n8n-nodes-late
```

### From Source

```bash
git clone https://github.com/getlatedev/n8n-nodes-late.git
cd n8n-nodes-late
npm install
npm run build
```

## Prerequisites

1. **LATE Account**: Sign up at [getlate.dev](https://getlate.dev)
2. **API Key**: Generate an API key from your LATE dashboard
3. **Social Accounts**: Connect your social media accounts to LATE profiles

## Credentials Setup

1. Add a new credential in n8n
2. Search for "LATE API"
3. Enter your API key from the LATE dashboard

## Quick Start

### 1. Create a Profile

Profiles organize your social media accounts by brand, client, or purpose.

```json
{
  "resource": "profiles",
  "operation": "create",
  "name": "Personal Brand",
  "description": "My personal social media accounts",
  "color": "#4ade80"
}
```

### 2. Connect Social Accounts

Connect your social media platforms to the profile:

```json
{
  "resource": "connect",
  "operation": "connect",
  "platform": "twitter",
  "profileId": "profile_123_abc"
}
```

### 3. Schedule a Post

Create posts across multiple platforms:

```json
{
  "resource": "posts",
  "operation": "create",
  "content": "Hello, world! 🌍 #automation",
  "platforms": [
    {"platform": "twitter", "accountId": "twitter_account_123"},
    {"platform": "linkedin", "accountId": "linkedin_account_456"}
  ],
  "scheduledFor": "2024-01-15T16:00:00",
  "timezone": "America/New_York"
}
```

## Supported Operations

### Profiles
- **List** - Get all profiles
- **Create** - Create new profile (subject to plan limits)
- **Update** - Update profile details
- **Delete** - Delete profile (must be empty)

### Posts
- **List** - Get posts with pagination and filters
- **Get** - Get specific post details
- **Create** - Schedule or publish posts
- **Update** - Edit draft/scheduled posts
- **Delete** - Delete posts (published posts cannot be deleted)
- **Retry** - Retry failed posts

### Media
- **Upload** - Upload images/videos up to 5GB

### Social Accounts
- **List** - View connected accounts
- **Delete** - Disconnect accounts

### Connect Platform
- **Connect** - Initiate OAuth for new platforms

### Usage Statistics
- **Get Stats** - Monitor usage against plan limits

### Facebook Management
- **List Pages** - Get available Facebook pages
- **Select Page** - Connect specific page
- **Update Page** - Change active page

### LinkedIn Management
- **Update Organization** - Switch between personal/company posting

### Clone Connection
- **Clone Connection** - Reuse OAuth across profiles

## Advanced Features

### Platform-Specific Settings

#### Twitter/X Threads
Create multi-tweet threads:

```json
{
  "platforms": [
    {
      "platform": "twitter",
      "accountId": "twitter_account_123",
      "platformSpecificData": {
        "threadItems": [
          {"content": "Tweet 1 - Introduction 🧵"},
          {"content": "Tweet 2 - Details"},
          {"content": "Tweet 3 - Conclusion"}
        ]
      }
    }
  ]
}
```

#### Instagram Stories
Post to Instagram Stories:

```json
{
  "platforms": [
    {
      "platform": "instagram", 
      "accountId": "instagram_account_123",
      "platformSpecificData": {
        "contentType": "story"
      }
    }
  ],
  "mediaItems": [
    {"type": "image", "url": "https://your-story-image.jpg"}
  ]
}
```

#### TikTok Privacy Settings
Control TikTok post privacy:

```json
{
  "platforms": [
    {
      "platform": "tiktok",
      "accountId": "tiktok_account_123", 
      "platformSpecificData": {
        "tiktokSettings": {
          "privacy_level": "PUBLIC_TO_EVERYONE",
          "allow_comment": true,
          "allow_duet": true,
          "allow_stitch": true
        }
      }
    }
  ]
}
```

#### YouTube Settings
Add custom thumbnails and first comments:

```json
{
  "platforms": [
    {
      "platform": "youtube",
      "accountId": "youtube_account_123",
      "platformSpecificData": {
        "firstComment": "Thanks for watching! Don't forget to like and subscribe! 🎥"
      }
    }
  ],
  "mediaItems": [
    {
      "type": "video", 
      "url": "https://your-video.mp4",
      "thumbnail": "https://your-custom-thumbnail.jpg"
    }
  ],
  "tags": ["tutorial", "automation", "n8n"]
}
```

### Media Upload

Upload files before using in posts:

```json
{
  "resource": "media",
  "operation": "upload",
  "files": [
    {
      "filename": "image.jpg",
      "data": "base64_encoded_data"
    }
  ]
}
```

For large files (>4MB), use the `@vercel/blob` client-upload method as described in the [LATE API documentation](https://getlate.dev/docs).

## Platform Requirements

- **Instagram**: Business account required (Personal/Creator accounts not supported)
- **Facebook**: Must be admin of Facebook pages
- **LinkedIn**: Company pages require admin access
- **TikTok**: Creator account recommended
- **YouTube**: Channel access required
- **Twitter/X**: Standard account
- **Threads**: Standard account

## Plan Limits

LATE enforces usage limits based on your plan:

- **Free**: 10 uploads/month, 2 profiles
- **Basic**: 120 uploads/month, 10 profiles  
- **Professional**: Unlimited uploads, 50 profiles
- **Advanced**: Unlimited uploads, 150 profiles
- **Enterprise**: Unlimited uploads, 250 profiles

Monitor usage with the Usage Statistics operation.

## Error Handling

The node handles various error scenarios:

- **403**: Plan limits exceeded
- **401**: Invalid API key
- **400**: Invalid request data
- **404**: Resource not found

Check the node output for detailed error messages and upgrade suggestions.

## Development

### Prerequisites
- Node.js 18+
- TypeScript
- n8n development environment

### Setup
```bash
git clone https://github.com/getlatedev/n8n-nodes-late.git
cd n8n-nodes-late
npm install
npm run build
```

### Linting
```bash
npm run lint        # Check for issues
npm run lintfix     # Fix automatically
```

## Support

- **Documentation**: [LATE API Docs](https://getlate.dev/docs)
- **Dashboard**: [getlate.dev/dashboard](https://getlate.dev/dashboard)
- **Email**: [miki@getlate.dev](mailto:miki@getlate.dev)
- **Issues**: [GitHub Issues](https://github.com/getlatedev/n8n-nodes-late/issues)

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

---

**Made with ❤️ by the LATE team**

[Website](https://getlate.dev) • [Documentation](https://getlate.dev/docs) • [Dashboard](https://getlate.dev/dashboard)