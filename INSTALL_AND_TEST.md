# Installation and Testing Guide

## n8n-nodes-modern-treasury

> [Velocity BPA Licensing Notice]
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

**Author:** Velocity BPA  
**Website:** [velobpa.com](https://velobpa.com)  
**GitHub:** [Velocity-BPA](https://github.com/Velocity-BPA)

---

## Prerequisites

Before installing, ensure you have:

- **Node.js** >= 18.10
- **pnpm** >= 9.1 (recommended) or npm
- **n8n** installed locally or access to n8n instance

---

## Step-by-Step Installation

### Step 1: Extract the Package

```bash
# Extract the zip file
unzip n8n-nodes-modern-treasury.zip

# Navigate to the directory
cd n8n-nodes-modern-treasury
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
pnpm install
```

### Step 3: Build the Project

```bash
# Compile TypeScript and copy assets
pnpm build
```

### Step 4: Link to n8n (Development Mode)

```bash
# Create a global link
npm link

# Navigate to your n8n installation (usually ~/.n8n or where n8n is installed)
cd ~/.n8n

# Link the package
npm link n8n-nodes-modern-treasury
```

### Step 5: Restart n8n

```bash
# If running n8n locally
n8n start

# Or if using pm2
pm2 restart n8n

# Or if using Docker, restart your container
docker restart <n8n-container-name>
```

---

## Alternative Installation Methods

### Method A: Copy to Custom Nodes Directory

```bash
# Copy the built package to n8n custom directory
cp -r n8n-nodes-modern-treasury ~/.n8n/custom/

# Or for global n8n installation
cp -r n8n-nodes-modern-treasury /usr/local/lib/node_modules/n8n/node_modules/
```

### Method B: Install from npm (when published)

```bash
# In your n8n custom directory
cd ~/.n8n/custom
npm install n8n-nodes-modern-treasury
```

---

## Running Tests

### Run All Tests

```bash
# Execute the test suite
pnpm test

# Or use the test script
./scripts/test.sh
```

### Run Tests with Coverage

```bash
pnpm test:coverage
```

### TypeScript Type Check

```bash
pnpm exec tsc --noEmit
```

---

## Verifying Installation

### 1. Check n8n Logs

After restarting n8n, check the logs for successful node loading:

```bash
# If using n8n start
# Look for: "Loaded nodes from: n8n-nodes-modern-treasury"

# If using Docker
docker logs <n8n-container-name> | grep -i "modern"
```

### 2. Verify in n8n UI

1. Open n8n in your browser
2. Create a new workflow
3. Click **Add Node** (+)
4. Search for "Modern Treasury"
5. You should see:
   - **Modern Treasury** (main node)
   - **Modern Treasury Trigger** (webhook trigger)

### 3. Test Credentials

1. Go to **Credentials** → **Add Credential**
2. Search for "Modern Treasury API"
3. Enter your sandbox credentials
4. Click **Test** to verify connection

---

## Testing Workflows

### Test 1: List Internal Accounts

1. Create a new workflow
2. Add **Modern Treasury** node
3. Configure:
   - Resource: `Internal Account`
   - Operation: `Get Many`
4. Execute the workflow
5. Verify accounts are returned

### Test 2: Validate Routing Number

1. Add **Modern Treasury** node
2. Configure:
   - Resource: `Routing Number`
   - Operation: `Validate`
   - Routing Number: `021000021` (Chase example)
   - Type: `aba`
3. Execute and verify bank information is returned

### Test 3: Create Counterparty (Sandbox)

1. Add **Modern Treasury** node
2. Configure:
   - Resource: `Counterparty`
   - Operation: `Create`
   - Name: `Test Company`
   - Email: `test@example.com`
3. Execute and verify counterparty is created

---

## Troubleshooting

### Node Not Appearing

1. Verify the build completed successfully
2. Check that files exist in `dist/` directory
3. Restart n8n completely
4. Check n8n logs for errors

### Credential Test Failing

1. Verify Organization ID is correct
2. Verify API Key is correct
3. Check you're using the right environment (sandbox/production)
4. Ensure API key has required permissions

### Build Errors

```bash
# Clear and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

### TypeScript Errors

```bash
# Check for type errors
pnpm exec tsc --noEmit
```

---

## Environment Variables (Optional)

For development, you can set these environment variables:

```bash
export N8N_CUSTOM_EXTENSIONS="~/.n8n/custom"
export N8N_LOG_LEVEL="debug"
```

---

## Uninstallation

```bash
# Unlink the package
npm unlink n8n-nodes-modern-treasury

# Remove from custom directory
rm -rf ~/.n8n/custom/n8n-nodes-modern-treasury
```

---

## Support

For issues or questions:

- **GitHub Issues:** [Velocity-BPA/n8n-nodes-modern-treasury](https://github.com/Velocity-BPA/n8n-nodes-modern-treasury/issues)
- **Website:** [velobpa.com](https://velobpa.com)
- **Modern Treasury Docs:** [docs.moderntreasury.com](https://docs.moderntreasury.com)
