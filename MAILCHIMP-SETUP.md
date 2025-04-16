# Mailchimp Setup for BLOODLETTER HQ Website

This guide explains how to setup Mailchimp for the two subscription forms on the BLOODLETTER HQ website:
- Citizen's Log (newsletter form)
- The Creative Journey (contact form)

## Step 1: Create Tags in Your Mailchimp Audience

1. Log into your Mailchimp account
2. Click "Audience" in the left sidebar
3. Select "All contacts" to view your "Cataclysm Studios" audience
4. Click "Tags" in the upper navigation
5. Click "Create Tag" and create:
   - Tag name: `Citizen's Log`
   - Tag name: `The Creative Journey`

## Step 2: Get Your API Key

1. Click your profile icon (bottom left corner)
2. Go to "Account & Billing"
3. Select "Extras" → "API keys"
4. Click "Create a Key"
5. Name it "BLOODLETTER Website Integration"
6. Copy the generated API key

## Step 3: Find Your Audience ID

1. Go to "Audience" → "All contacts"
2. Click "Settings" → "Audience name and defaults"
3. Scroll down to the bottom
4. Find your "Audience ID" (looks like a string of letters and numbers)

## Step 4: Determine Your API Server

Look at your Mailchimp URL when logged in. It will contain something like:
`us10.admin.mailchimp.com`

The server prefix you need is just `us10` (yours might be different, like us1, us6, etc.)

## Step 5: Update Your Environment Variables

Add the following to your `.env.local` file:

```
# Mailchimp API configuration
MAILCHIMP_API_KEY=paste_your_api_key_here
MAILCHIMP_AUDIENCE_ID=paste_your_audience_id_here
MAILCHIMP_API_SERVER=usX  # Replace X with your number (e.g., us10)
```

## Step 6: Add Variables to Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add the same variables from your `.env.local` file
5. Redeploy your site

## How It Works

- When someone subscribes via the "Citizen's Log" form in the footer, they'll be added to your audience with the "Citizen's Log" tag.
- When someone submits the contact form, they'll be added with "The Creative Journey" tag.
- Existing subscribers will have their appropriate tags added/updated.

## Viewing Your Subscribers by Category

1. Go to "Audience" → "All contacts"
2. Click "View Contacts"
3. Click "Tags" in the filter options
4. Select either "Citizen's Log" or "The Creative Journey" to view subscribers from each source

## Sending Emails to Specific Groups

1. Start creating a campaign
2. At the "To" step, click "Group or new segment"
3. Under "Group or segment conditions" choose "Contacts match any condition"
4. Set condition: "Tags" → "is" → select your tag (either "Citizen's Log" or "The Creative Journey")
5. This will send your email only to subscribers with the selected tag 