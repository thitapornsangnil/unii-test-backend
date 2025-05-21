# migration
npx sequelize-cli db:migrate

# import data by api
node importData.js

# env ex.
- DB_HOST=localhost
- DB_PORT=3306
- DB_NAME=unii-test
- DB_USER=root
- DB_PASS=
- DB_DIALECT=mysql
- NODE_ENV=development


------------------------------------

1. สร้างไฟล์ .env ใส่ข้่อมูลตามตัวอย่าง
2. run คำสั่ง #migration
3. run คำสั่ง #import data by api

# ต้อง install sequelize-cli ด้วย
npx sequelize-cli init
