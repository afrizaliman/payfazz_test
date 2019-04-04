# Test API - Payfazz

Diasumsikan sudah terinstall npm dan postgreSQL

# Cara menggunakan service (API) ini : 
  - Pull dari branch master / feature (development)
  - Buat database postgree dengan nama "test_api"
  - Migrasi database 
-  Jalankan Aplikasi
-  Jalankan Test Unit

# Clone Project
```sh
$ git clone git@github.com:afrizaliman/payfazz_test.git
```

# Migrasi Database
Dengan cara eksekusi command ini di terminal
```sh
$ DATABASE_URL=postgres://{user db}:{password db}@localhost:5432/test_api npm run migrate up;
```
# Jalankan Aplikasi
Dengan cara eksekusi command ini diterminal, port untuk jalankan API menggunakan port : 3000
```sh
$ npm start
```
# Jalankan Test Unit
Dengan cara eksekusi command ini diterminal, port untuk unit test menggunakan port : 3001
```sh
$ npm test
```
# Keterangan Aplikasi
Aplikasi ini dibuat menggunakan nodeJs (Express JS) dan postgresql sebagai database, Mocha Chai untuk unit test, dan jsonwebtoken untuk keamanan akses.

