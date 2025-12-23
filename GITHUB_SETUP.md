# GitHub Repository Setup

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

## Initial Repository Setup

```bash
# Extract and navigate
unzip n8n-nodes-modern-treasury.zip
cd n8n-nodes-modern-treasury

# Initialize and push
git init
git add .
git commit -m "Initial commit: n8n Modern Treasury community node

Features:
- Payment Order: Create, get, list, update ACH/wire/RTP payments
- Counterparty: Full CRUD with account collection
- External Account: Create, verify, manage external bank accounts
- Internal Account: Retrieve organization accounts
- Transaction: Query and update transaction records
- Expected Payment: Set up automatic reconciliation
- Return: Create and manage payment returns
- Virtual Account: Create virtual accounts for routing
- Routing Number: Validate ABA, SWIFT, and other routing numbers
- Webhook Trigger: Real-time notifications with HMAC verification"

git remote add origin https://github.com/Velocity-BPA/n8n-nodes-modern-treasury.git
git branch -M main
git push -u origin main
```

---

## Repository Settings

After pushing, configure your repository:

### Description
```
n8n community node for Modern Treasury payment operations - ACH, wire, RTP, counterparty management, and treasury automation
```

### Topics
```
n8n, n8n-community-node-package, modern-treasury, ach, wire, payments, treasury, rtp, banking, fintech, payment-operations
```

### Website
```
https://velobpa.com
```

---

## Releases

### Creating a Release

```bash
# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0

Features:
- Payment Order operations (ACH, wire, RTP, SEPA)
- Counterparty management with account collection
- External/Internal account operations
- Transaction management
- Expected payments for reconciliation
- Return handling
- Virtual accounts
- Routing number validation
- Webhook trigger with signature verification"

# Push the tag
git push origin v1.0.0
```

---

## Future Updates

### Version Update Workflow

```bash
# Update version in package.json
# Make your changes

git add .
git commit -m "feat: description of changes

- Change 1
- Change 2
- Change 3"

git tag -a v1.1.0 -m "Release v1.1.0 - Description"
git push origin main
git push origin v1.1.0
```
