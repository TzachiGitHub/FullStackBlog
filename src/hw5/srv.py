from flask import Flask, request, abort, make_response
import mysql.connector as mysql
import json
import bcrypt
import uuid
from flask_cors import CORS

# db = mysql.connect(
#     host="my-rds.cmpq1mavlbmq.us-east-1.rds.amazonaws.com",
#     port=3306,
#     user="admin",
#     password="beni",
#     database="beni"
#     )


db = mysql.connect(
  host='localhost',
  user='root',
  password= 'beni',
  database='beni'
)

# print(db)
#
app = Flask(__name__)
CORS(app)
            # static_folder='/home/ubuntu/build',
            # //static_url_path='/')
@app.route('/kjh', methods=['GET'])
def main():
    return "WTF??"

# @app.route('/', methods=['GET'])
# def main():
#     return app.send_static_file("index.html")

#
# @app.route('/api/alive', methods=['GET'])
# def alive_check():
#     return "Alive!"



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
    query = "insert into posts (title,content,published,author,imageurl, author_id) values (%s,%s,%s,%s, %s, %s)"
    values = (data['title'], data['content'], data['published'], data['author'], data['imageurl'], data['userId'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    add_post_id = cursor.lastrowid
    cursor.close()
    return get_post(add_post_id)


def get_post(id):
    query = "select id, title, content, published, author, imageurl, author_id from posts where id = %s"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    record = cursor.fetchone()
    header = ['id', 'title', 'content', 'published', 'author', 'imageurl', 'authorId']
    cursor.close()
    return json.dumps(dict(zip(header, record)))


def get_all_posts():
    # checkQuery = "SELECT EXISTS (SELECT 1 FROM posts);"
    # cursor = db.cursor()
    # cursor.execute(checkQuery,)
    # record = cursor.fetchone()
    # if record <= 0:
    #     return"is empty"

    query = "select id, title, content, published, author, imageurl, author_id from posts"
    cursor = db.cursor()
    cursor.execute(query,)
    records = cursor.fetchall()
    if not records:
        cursor.close();
        abort(405)
    cursor.close()

    header = ['id', 'title', 'content', 'published', 'author', 'imageurl', 'authorId']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
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
    # print(user_pwd)
    # print(hashed_pwd)

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
    # print(hashedPass)
    values = (data['name'], hashedPass)
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

@app.route('/edit', methods=['POST'])
def edit():
    data = request.get_json()
    # print("data: == ")
    # print(data)
    author_query = "select author_id from posts where id=%s"
    author_value = (data['postId'], )
    cursor = db.cursor()
    cursor.execute(author_query, author_value)
    record = cursor.fetchone()
    if not record:
        cursor.close()
        abort(401)
    # print(record)
    if data['authorId'] != record[0]:
        cursor.close()
        abort(403)

    query = "update posts set title=%s, content=%s, published=%s, author=%s, imageUrl=%s, author_id=%s where id=%s"
    values = (data['title'], data['content'], data['published'], data['author'], data['imageurl'], data['authorId'], data['postId'])
    cursor.execute(query, values)
    cursor.close()
    return "success edit post "


@app.route('/comment/<id>', methods=['GET', 'POST'])
def manage_requests2(id):
    if request.method == 'GET':
        return get_all_comments(id)
    else:
        return add_comment(id)

def add_comment(id):
    data = request.get_json()

    query = "insert into comments (title, content, author, author_id, post_id) values (%s,%s,%s,%s,%s) on duplicate key update post_id = %s"
    # print(data['userId'])
    values = (data['title'], data['content'], data['author'], data['authorId'], data['postId'], data['postId'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    add_comment_id = cursor.lastrowid
    # print("add_comment_id=")
    # print(str(add_comment_id))
    cursor.close()
    return get_comment(add_comment_id)


def get_comment(id):
    query = "select id, title, content, author, author_id from comments where id = %s"
    value = (id,)
    cursor = db.cursor()
    cursor.execute(query, value)
    record = cursor.fetchone()
    header = ['id', 'title',  'author', 'content', 'authorId']
    cursor.close()
    return json.dumps(dict(zip(header, record)))


def get_all_comments(id):
    query = "select id, title, content, author, author_id, post_id from comments where post_id=%s"
    value = (id, )
    cursor = db.cursor()
    cursor.execute(query, value)
    records = cursor.fetchall()
    if not records:
        cursor.close();
        abort(405)
    cursor.close()
    # print(records)
    header = ['id', 'title', 'content', 'author', 'author_id', 'post_id']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)

@app.route('/delete/<id>', methods=['POST'])
def delete_comment(id):
    print(id)
    queryComment = "delete from comments where post_id =%s"
    value = (id, )
    cursor = db.cursor()
    cursor.execute(queryComment, value)
    db.commit()
    cursor.close()

    queryPost = "delete from posts where id = %s"
    value = (id, )
    cursor = db.cursor()
    cursor.execute(queryPost, value)
    db.commit()
    cursor.close()

    return "Succeeded to delete comments for post_id"




if __name__ == "__main__":
    app.run()