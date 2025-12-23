# n8n-nodes-modern-treasury

> [Velocity BPA Licensing Notice]
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

[![License: BUSL-1.1](https://img.shields.io/badge/License-BUSL--1.1-blue.svg)](LICENSE)
[![n8n Community Node](https://img.shields.io/badge/n8n-community--node-orange.svg)](https://n8n.io)

An n8n community node for [Modern Treasury](https://www.moderntreasury.com/) payment operations platform. Automate ACH transfers, wire transfers, RTP payments, counterparty management, reconciliation, and treasury operations.

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Features

- **Payment Order**: Create, retrieve, list, and update payment orders (ACH, wire, RTP, SEPA, and more)
- **Counterparty**: Manage counterparties with account collection capabilities
- **External Account**: Create and verify external bank accounts
- **Internal Account**: Retrieve your organization's internal accounts
- **Transaction**: Query and update transaction records
- **Expected Payment**: Set up expected payments for automatic reconciliation
- **Return**: Create and manage payment returns
- **Virtual Account**: Create virtual accounts for payment routing
- **Routing Number**: Validate routing numbers across multiple types
- **Webhook Trigger**: Receive real-time notifications for payment events

## Installation

### Using pnpm (Recommended)

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Clone or extract the package
# Then install dependencies
pnpm install n8n-nodes-modern-treasury
```

### Manual Installation

1. Extract the package to `~/.n8n/custom/n8n-nodes-modern-treasury`
2. Navigate to the directory and install dependencies:
   ```bash
   cd ~/.n8n/custom/n8n-nodes-modern-treasury
   pnpm install
   pnpm build
   ```
3. Restart n8n

### Using npm link (Development)

```bash
cd n8n-nodes-modern-treasury
pnpm install
pnpm build
npm link

# In your n8n installation directory
npm link n8n-nodes-modern-treasury
```

## Configuration

### Credentials Setup

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for **Modern Treasury API**
3. Enter your credentials:
   - **Organization ID**: Your Modern Treasury organization ID
   - **API Key**: Your Modern Treasury API key
   - **Environment**: Select `sandbox` for testing or `production` for live operations

### Getting API Credentials

1. Log in to your [Modern Treasury Dashboard](https://app.moderntreasury.com/)
2. Navigate to **Settings** → **API Keys**
3. Create a new API key or use an existing one
4. Copy the Organization ID and API Key

## Usage Examples

### Create an ACH Payment

1. Add the **Modern Treasury** node to your workflow
2. Select **Payment Order** as the resource
3. Choose **Create** operation
4. Configure:
   - Type: `ach`
   - Amount: `10000` (in cents = $100.00)
   - Direction: `credit`
   - Originating Account ID: Your internal account ID
   - Additional fields as needed

### Create a Counterparty

1. Add the **Modern Treasury** node
2. Select **Counterparty** as the resource
3. Choose **Create** operation
4. Enter:
   - Name: Counterparty name
   - Email: Contact email
   - Add account details in Additional Fields

### Set Up Webhook Trigger

1. Add the **Modern Treasury Trigger** node
2. Configure credentials
3. Enter your webhook secret from Modern Treasury
4. Select events to listen for:
   - `payment_order.completed`
   - `transaction.created`
   - etc.

## Supported Resources & Operations

| Resource | Operations |
|----------|------------|
| Payment Order | Create, Get, Get Many, Update |
| Counterparty | Create, Get, Get Many, Update, Delete, Collect Account |
| External Account | Create, Get, Get Many, Update, Delete, Verify |
| Internal Account | Get, Get Many |
| Transaction | Get, Get Many, Update |
| Expected Payment | Create, Get, Get Many, Update, Delete |
| Return | Create, Get, Get Many |
| Virtual Account | Create, Get, Get Many, Update, Delete |
| Routing Number | Validate |

## Webhook Events

The trigger node supports these Modern Treasury events:

- `payment_order.created`, `payment_order.updated`, `payment_order.completed`, `payment_order.failed`
- `transaction.created`, `transaction.updated`
- `expected_payment.created`, `expected_payment.reconciled`
- `return.created`, `return.updated`
- `external_account.created`, `external_account.verification_updated`

## Development

### Prerequisites

- Node.js >= 18.10
- pnpm >= 9.1

### Build

```bash
pnpm install
pnpm build
```

### Run Tests

```bash
pnpm test
```

### Watch Mode

```bash
pnpm dev
```

## API Reference

This node integrates with the Modern Treasury API. For detailed API documentation, visit:
- [Modern Treasury API Reference](https://docs.moderntreasury.com/platform/reference)

## License

[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

See the [LICENSE](LICENSE) file for the full license text, [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md) for commercial licensing details, and [LICENSING_FAQ.md](LICENSING_FAQ.md) for frequently asked questions.

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-modern-treasury/issues)
- **Documentation**: [Modern Treasury Docs](https://docs.moderntreasury.com/)
- **Commercial Support**: Contact [Velocity BPA](https://velobpa.com)

## Changelog

### 1.0.0

- Initial release
- Full support for Payment Orders, Counterparties, External/Internal Accounts
- Transaction management and Expected Payments
- Return handling and Virtual Accounts
- Routing number validation
- Webhook trigger with signature verification
