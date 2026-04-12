---
name: ba-n8n-validation-expert
description: "Interpret validation errors and guide fixing them. Use when encountering validation errors, validation warnings, or need help understanding validation results."
---

# HƯỚNG DẪN SKILL: BA N8N VALIDATION EXPERT

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Expert guide for interpreting and fixing n8n validation errors to ensure production-ready workflows.

---

## 🎯 Purpose
Empower BA to debug and fix workflow configurations iteratively. Validation is a loop, not a one-shot process.

---

## 📋 Severity Levels

1. **Errors (Must Fix)**: Blocks activation. (e.g., `missing_required`, `type_mismatch`, `invalid_expression`).
2. **Warnings (Recommended)**: Doesn't block but risky. (e.g., `best_practice`, `deprecated`).
3. **Suggestions (Optional)**: Performance or logic improvements.

---

## 🔄 The Validation Loop Pattern
1. Configure Node.
2. `validate_node` (23s avg thinking).
3. Read errors carefully.
4. Fix errors (58s avg fixing).
5. `validate_node` again.
*Repeat until valid (usually 2-3 iterations).*

---

## 🚨 Common Error Fixes

- **missing_required**: Use `get_node` to find required fields and add them.
- **invalid_expression**: Check for missing `{{ }}` or wrong node names (case-sensitive!).
- **type_mismatch**: Ensure number fields get numbers, not strings (e.g., `100` vs `"100"`).
- **Auto-Sanitization**: The system automatically fixes operator structures (e.g., `singleValue` for unary ops) on every save.

---

## 📄 Reference Guides
- [ERROR_CATALOG.md](ERROR_CATALOG.md) - Complete error type list.
- [FALSE_POSITIVES.md](FALSE_POSITIVES.md) - When you can safely ignore warnings.

