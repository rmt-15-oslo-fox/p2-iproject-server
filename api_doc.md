```
API DOC SERVER INDIVIDUAL PROJECT
```

# USER

- All User

```
http://localhost:3000/user/users
```

```
response:
{
    name: admin,
    email: 'mail@mail.com',
    password: 'xxxx',
    role: 'admin'
}
```

- Login

```
http://localhost:3000/user/login
```

```
body :
{
    email,
    password
}
```

```
response:
{
    access_token: eyqkjejnda3kk21OsndP,
}
```

- Register

```
http://localhost:3000/user/register
```

```
body :
{
    name,
    email,
    password
}
```

```
response:
{
    name: admin,
    email: 'mail@mail.com',
    password: 'xxxx',
    role: 'admin'
}
```

- Delete

```
http://localhost:3000/user/:id
```

```
params :
{
    id
}
```

```
response:
{
    message: 'User id ${id} permanently delete'
}
```

- Update

```
http://localhost:3000/user/:id
```

```
body :
{
    name,
    email,
    password
}
```

```
params :
{
    id
}
```

```
response:
{
    name: admin,
    email: 'mail@mail.com',
    password: 'xxxx',
    role: 'admin'
}
```

# ARTIKEL

- All Article

```
http://localhost:3000/articles
```

```
headers :
{
    access_token
}
```

```
response:
{
    judul: 'ini judul',
    isi: 'ini isi bukan judul',
    imageUrl_headline: 'url image',
    imageUrl_content: 'url image'
}
```

- Post Article

```
http://localhost:3000/articles
```

```
headers :
{
    access_token
}
```

```
response:
{
    judul: 'ini judul',
    isi: 'ini isi bukan judul',
    imageUrl_headline: 'url image',
    imageUrl_content: 'url image'
}
```

- Delete

```

http://localhost:3000/articles/:id

```

```

headers :
{
access_token
}

```

```
response:
{
    message: 'Article id ${id} success to delete'
}
```

- Update

```

http://localhost:3000/articles/:id

```

```

headers :
{
access_token
}

```

```
response:
{
    judul: 'ini judul',
    isi: 'ini isi bukan judul',
    imageUrl_headline: 'url image',
    imageUrl_content: 'url image'
}
```

# KONTAK

- All Kontak

```

http://localhost:3000/contact

```

```

response:
{
name: user name,
email: 'user@mail.com',
perusahaan: 'xyz',
topik: 'kerjasama',
pesan: 'kerjasama boleh?'
}

```

```

headers :
{
access_token
}

```

- Send Message

```

http://localhost:3000/contact/send

```

```

headers :
{
access_token
}

```

```

response:
{
name: user name,
email: 'user@mail.com',
perusahaan: 'xyz',
topik: 'kerjasama',
pesan: 'kerjasama boleh?'
}

```

- Delete

```

http://localhost:3000/contact/:id

```

```

headers :
{
access_token
}

```

```
response:
{
    message: 'Contact id ${id} success to delete',
}
```

# HISTORY

- All History

```

http://localhost:3000/history

```

```

headers :
{
access_token
}

```

```
response:
{
userId: id,
title: 'title history',
description: 'deskripsi history',
updatedBy: id
}

```
