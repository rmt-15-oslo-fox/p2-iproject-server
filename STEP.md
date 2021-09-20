# TODO LIST PROJECT

## User

- `Username`
- `Email`
- `Password`
- `BirthDate`

## Todo

- `Task`
- `Description`
- `isComplete`
- `Tag`
- `CreatedAt`

## Endpoint

### Users

> POST /register `done`

> POST /login `done`

> GET /users `done`

<!-- > GET /users/:id/todos `done` -->

### Todos

> GET /todos/:userId `done` id = user.id dari params bukan req.user.id

> POST /todos/:userId hanya user nya sndiri yg bsa access `done` (user.id bsa dpt dri req.user.id) => where isComplete false

> authorization dri sini smpe bawah

> PUT /todos/:todoId hanya user nya sndiri yg bsa access

> PATCH /todos/:todoId hanya user nya sndiri yg bsa access

> DELETE /todos/:todoId hanya user nya sndiri yg bsa access

# tambah halaman buat history todo yg udh selese

> GET /todos/:userId where: isComplete true

### Tags TodoTags

> POST /tags = create TodoTag
