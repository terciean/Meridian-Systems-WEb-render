/*
# Remove enquiries table

1. Modified Tables
- `enquiries` is dropped. It held no rows, because questionnaire submissions are now sent straight to email and not stored.

2. Security
- The public insert permission on the table is removed together with the table.

3. Important notes
- No customer data is lost by this change, since the table was empty.
*/

DROP TABLE IF EXISTS enquiries;
