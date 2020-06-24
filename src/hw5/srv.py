from flask import Flask, request, abort, make_response
import mysql.connector as mysql
import json
import bcrypt
import uuid
from flask_cors import CORS

db = mysql.connect(
    host='localhost',
    user='root',
    password= 'Beniandsara2020',
    database='beni'
)

print(db)

app = Flask(__name__)
CORS(app)

@app.route('/logout/<id>', methods=['POST'])
def logout(id):
    query = "delete from sessions where user_id=%s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return "success"

@app.route('/posts', methods=['GET', 'POST'])
def manage_requests():
    if request.method == 'GET':
        return get_all_posts()
    else:
        return add_post()

@app.route('/post/<id>', methods=['GET'])
def Get_Post_by_Id(id):
    return get_post(id)


def add_post():
    data = request.get_json()
    query = "insert into posts (title,content,published,author,imageurl) values (%s,%s,%s,%s, %s)"
    values = (data['title'], data['content'], data['published'], data['author'], data['imageurl'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    add_post_id = cursor.lastrowid
    cursor.close()
    return get_post(add_post_id)


def get_post(id):
    query = "select id, title, content, published, author, imageurl from posts where id = %s"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    record = cursor.fetchone()
    header = ['id', 'title', 'content', 'published', 'author', 'imageurl']
    cursor.close()
    return json.dumps(dict(zip(header, record)))


def get_all_posts():
    query = "select id, title, content, published, author, imageurl from posts"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    if not records:
        cursor.close();
        abort(405)
    cursor.close()
    print(records)
    header = ['id', 'title', 'content', 'published', 'author', 'imageurl']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    query = "select id, password from users where name = %s"
    values = (data['name'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)

    user_id = record[0]
    user_pwd = record[1]
    hashed_pwd = user_pwd.encode('utf-8')
    print(user_pwd)
    print(hashed_pwd)

    if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:

        print("wrong password")
        cursor.close()
        abort(401)

    session_id = str(uuid.uuid4())
    query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
    values = (user_id, session_id, session_id)
    cursor.execute(query, values)
    db.commit()
    resp = make_response()
    resp.set_cookie("session_id", session_id)
    cursor.close()
    return resp

@app.route('/getidbyname/<name>', methods=['GET'])
def get_id(name):
    name = str(name)
    query = "select id from users where name=%s"
    value = (name,)
    cursor = db.cursor()
    cursor.execute(query, value)
    record = cursor.fetchone()
    header = ['id']
    cursor.close()
    return json.dumps(dict(zip(header, record)))


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data)
    query = "select id, name from users where name = %s"
    values = (data['name'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if record:
        cursor.close()
        abort(401)

    query = "insert into users (name, password) values (%s, %s)"
    hashedPass = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    print(hashedPass)
    values = (data['name'],hashedPass)
    cursor.execute(query, values)
    db.commit()

    query = "select id from users where name = %s"
    values = (data['name'],)
    cursor.execute(query, values)
    user_id = cursor.fetchone()[0]
    session_id = str(uuid.uuid4())

    query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
    values = (user_id, session_id, session_id)

    cursor.execute(query, values)
    db.commit()
    resp = make_response()
    resp.set_cookie("session_id", session_id)
    cursor.close()
    return resp

if __name__ == "__main__":
    app.run()