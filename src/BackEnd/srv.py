from flask import Flask, request, abort, make_response, g
# import mysql.connector, mysql.connector.pooling
import mysql.connector as mysql
import json
import bcrypt
import uuid
from flask_cors import CORS

# import Cookies from `js-cookie`

# pool = mysql.connector.pooling.MySQLConnectionPool(
#     # host="my-rds.cmpq1mavlbmq.us-east-1.rds.amazonaws.com",
#     host='localhost',
#     user='root',
#     password='beni2020',
#     database='beni',
#     buffered=True,
#     pool_size=3,
# )


db = mysql.connect(
    host='localhost',
    user='root',
    password='Beni',
    database='beni'
)

# print(db)


app = Flask(__name__)
CORS(app)


# ,
# static_folder='/home/ubuntu/build',
# static_url_path='/')
# //to remmember to add db =

# @app.before_request
# def before_request():
#     # db = pool.get_connection()
# @app.teardown_request
# def teardown_request(exception):
#     db.close()

@app.route('/', methods=['GET'])
def main():
    return app.send_static_file("index.html")


@app.route('/api/alive', methods=['GET'])
def alive_check():
    return "Alive!"


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    query = "select id, password from users where name=%s"
    values = (data['username'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)

    user_id = record[0]
    hashed_pwd = record[1].encode('utf-8')
    if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:
        cursor.close()
        abort(401)

    session_id = str(uuid.uuid4())
    query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
    values = (user_id, session_id, session_id)
    cursor.execute(query, values)
    db.commit()
    username = data['username']
    # cookieJs = {"username": username, "userId": user_id}
    # resp = make_response(cookieJs)
    resp = make_response()
    resp.set_cookie("session_id", session_id)
    resp = {"userId": record[0]}
    cursor.close()
    return resp


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data)
    query = "select name from users where name = %s"
    values = (data['username'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    if record:
        cursor.close()
        abort(401)
    query = "insert into users (name, password,user_email) values (%s, %s,%s)"
    hashedPass = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    values = (data['username'], hashedPass, data['useremail'])
    cursor.execute(query, values)
    db.commit()

    query = "select id from users where name = %s"
    values = (data['username'],)
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


# @app.route('/getidbyname/<name>', methods=['GET'])
# def get_id(name):
#     name = str(name)
#     query = "select id from users where name=%s"
#     value = (name,)
#     cursor = db.cursor()
#     cursor.execute(query, value)
#     record = cursor.fetchone()
#     header = ['id']
#     cursor.close()
#     return json.dumps(dict(zip(header, record)))

@app.route('/logout', methods=['POST'])
def logout():
    # session_id = request.cookies.get('session_id')
    data = request.get_json()
    # id = vaildate_sessions()
    id = data['userId']
    query = "delete from sessions where user_id=%s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return "success"


@app.route('/post/<id>', methods=['GET'])
def get_post(id):
    query = "select id, title, content, published, author, imageurl, author_id from posts where id = %s"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)
    header = ['id', 'title', 'content', 'published', 'author', 'imageUrl', 'authorId']
    cursor.close()
    return json.dumps(dict(zip(header, record)))


@app.route('/posts', methods=['GET'])
def get_all_posts():
    query = "select id, title, content, published, author, imageurl, author_id from posts"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    if not records:
        cursor.close();
        abort(401)
        # cursor.close()

    header = ['id', 'title', 'content', 'published', 'author', 'imageUrl', 'authorId']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)


@app.route('/newpost', methods=['POST'])
def add_post():
    data = request.get_json()
    query = "insert into posts (title, content, published, author, imageurl, author_id) values (%s, %s, %s, %s, %s, %s)"
    values = (data['title'], data['content'], data['published'], data['username'], data['imageUrl'], data['userId'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    records = cursor.lastrowid
    if not records:
        abort(401)
        cursor.close()
    add_post_by_id = cursor.lastrowid
    cursor.close()
    return get_post(add_post_by_id)


def get_post(id):
    query = "select id, title, content, published, author, imageurl, author_id from posts where id = %s"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)
    header = ['id', 'title', 'content', 'published', 'author', 'imageUrl', 'authorId']
    cursor.close()
    return json.dumps(dict(zip(header, record)))


@app.route('/edit', methods=['POST'])
def edit():
    data = request.get_json()
    author_query = "select author_id from posts where id=%s"
    author_value = (data['postId'],)
    cursor = db.cursor()
    cursor.execute(author_query, author_value)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)

    if data['authorId'] != record[0]:
        cursor.close()
        abort(403)

    query = "update posts set title=%s, content=%s, published=%s, author=%s, imageurl=%s, author_id=%s where id=%s"
    values = (data['title'], data['content'], data['published'], data['author'], data['imageUrl'], data['authorId'],
              data['postId'])
    cursor.execute(query, values)
    cursor.close()
    return "success edit post "


@app.route('/comment/<id>', methods=['GET', 'POST'])
def manage_requests(id):
    if request.method == 'GET':
        return get_all_comments(id)
    else:
        return add_comment()


def get_all_comments(id):
    query = "select id, title, content, author, author_id, post_id ,published from comments where post_id=%s"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    if not records:
        abort(401)
        cursor.close();
    header = ['id', 'title', 'content', 'author', 'author_id', 'post_id', 'published']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)


def add_comment():
    data = request.get_json()
    query = "insert into comments (title, content, author, author_id, post_id,published) values (%s,%s,%s,%s,%s,%s) on duplicate key update post_id = %s"
    values = (data['title'], data['content'], data['username'], data['authorId'], data['postId'], data['published'], data['postId'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    records = cursor.lastrowid
    if not records:
        abort(401)
        cursor.close()
    add_comment_id = cursor.lastrowid
    cursor.close()
    return get_comment(add_comment_id)


def get_comment(id):
    query = "select title, content, author, published from comments where id = %s"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    record = cursor.fetchone()
    header = ['title', 'author', 'content', 'published']
    cursor.close()
    return json.dumps(dict(zip(header, record)))


@app.route('/deletepost', methods=['POST'])
def delete_post_and_comments():
    data = request.get_json()
    post_id = data['postId']
    queryComment = "delete from comments where post_id =%s"
    value = (post_id,)
    cursor = db.cursor()
    cursor.execute(queryComment, value)
    db.commit()
    cursor.close()

    queryPost = "delete from posts where id = %s"
    value = (post_id,)
    cursor = db.cursor()
    cursor.execute(queryPost, value)
    db.commit()
    cursor.close()
    return "Succeeded to delete comments for pt_id"

@app.route('/deletecomment', methods=['POST'])
def delete_comments():
    data = request.get_json()
    comment_id = data['commentId']
    queryComment = "delete from comments where id =%s"
    value = (comment_id,)
    cursor = db.cursor()
    cursor.execute(queryComment, value)
    db.commit()
    cursor.close()
    return "Succeeded to delete comment"

@app.route('/search/<wordsearch>', methods=['GET'])
def get_all_posts_for_search(wordsearch):
    print(wordsearchus
          )
    query = "select * from posts where content like %s"
    value = ("%" + wordsearch + "%",)
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    print(records)
    if not records:
        cursor.close();
        abort(401)
        # cursor.close()

    header = ['id', 'title', 'content', 'published', 'author', 'imageUrl', 'authorId']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)

if __name__ == "__main__":
    app.run()
