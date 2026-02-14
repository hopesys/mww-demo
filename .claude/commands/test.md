# เขียน Test: $ARGUMENTS

## ขั้นตอน

1. วิเคราะห์ว่าต้อง test อะไร (module/function/endpoint)
2. เขียน test ตาม pattern:

### Unit Test (service layer)
```typescript
describe('[ServiceName]', () => {
  describe('[methodName]', () => {
    it('should [expected] when [condition]', async () => {
      // Arrange — setup test data & mocks
      // Act — call the method
      // Assert — verify result
    });
  });
});
```

### Integration Test (API endpoint)
```typescript
describe('[METHOD] [path]', () => {
  it('should return [status] when [condition]', async () => {
    // Arrange — seed test data
    // Act — call API
    // Assert — verify response shape & data
    // Cleanup — remove test data
  });
});
```

## Must-have test cases:
- ✅ Happy path (valid input → expected output)
- ❌ Invalid input (missing fields, wrong types)
- 🔒 Unauthorized access
- 🔍 Not found (invalid ID)
- 💥 Duplicate / conflict
- 📄 Pagination (first page, last page, empty)
- 🧹 Edge cases (empty string, max length, special chars)
