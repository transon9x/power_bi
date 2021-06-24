from flask import Flask, jsonify
from flask_cors import CORS
import requests
app = Flask(__name__)
CORS(app)
@app.route("/get_data", methods=["GET"])
def test_api():
    url = "https://login.microsoftonline.com/common/oauth2/token"

    payload = {'client_id': '61c0e86d-6082-4395-81c9-57e2730a10a9',
               'client_secret': '88y7VApeF~cLUI81c_L9lJZygWCHFwHU-_',
               'grant_type': 'password',
               'resource': 'https://analysis.windows.net/powerbi/api',
               'scope': 'openid',
               'username': 'ttnhs@bidv.com.vn',
               'password': 'dateam@789!'}

    response = requests.request("POST", url, data=payload)
    url = "https://api.powerbi.com/v1.0/myorg/groups/bbf6a911-11be-4a9f-86d7-1b4f5fb876ca/reports/53fbf565-9484-4fcb-ab0c-35a7b69fd0d4"
    token = response.json()['access_token']
    payload = {}
    headers = {
        'Authorization': 'Bearer %s' % token
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    data_json = response.json()
    data ={'url_em':data_json['embedUrl'],
           'id_report': data_json['id'],
           'token': token}

    return  data

if __name__ == "__main__":
    app.run(host='192.168.1.96',port=9999, debug=True)
