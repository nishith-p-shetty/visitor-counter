# visitor-counter
This project keeps track of your page visitors.</br>
![](https://visitor-counter.nishithpshetty.tk/api?name=visitor-counter&operation=increment)

# USAGE

## API Reference

#### URL = https://visitor-counter.nishithpshetty.tk/

#### Show Visitor Count

```http
  GET /api?name=test&operation=show
```

| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `name`     | `string` | **Required**. name to track|
| `operation`| `string` | **Required**. show         |

#### Increment Visitor Count

```http
  GET /api?name=test&operation=increment
```

| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `name`     | `string` | **Required**. name to track|
| `operation`| `string` | **Required**. increment    |

#### Update Visitor Count to Required Value

```http
  GET /api/?name=test&operation=update&value=100
```

| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `name`     | `string` | **Required**. name to track|
| `operation`| `string` | **Required**. update       |
| `value`    | `int`    | **Required**. integer number|

#### Reset Visitor Count to 0

```http
  GET /api?name=test&operation=reset
```

| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `name`     | `string` | **Required**. name to track|
| `operation`| `string` | **Required**. reset        |

#### Delete Visitor Count

```http
  GET /api?name=test&operation=delete
```

| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `name`     | `string` | **Required**. name to track|
| `operation`| `string` | **Required**. delete       |

#### List All Visitor Count

```http
  GET /api/admin?operation=list
```

| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `operation`| `string` | **Required**. list         |

#### Delete All Visitor Count

```http
  GET /api/admin?operation=delete-all
```

| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `operation`| `string` | **Required**. delete-all   |
