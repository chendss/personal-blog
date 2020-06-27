import json
import time
import requests
import datetime
from random import choice
from pydash import get, union_by


def get_res():
    res = []
    with open('../hua.json', 'r', encoding='utf8') as f:
        r = f.read()
    if r == None or r == '':
        res = []
    else:
        res = json.loads(r)
    return res


def fillter_empty(list_):
    result = []
    for item in list_:
        if len(get(item, 'text', '')) < 14:
            continue
        else:
            result.append(item)
    return result


def sort_item(item):
    return len(item['text'])


def save_res(res):
    list_ = union_by(res, 'text')
    list_ = fillter_empty(list_)
    list_.sort(key=sort_item,)
    with open('../hua.json', 'w', encoding='utf8') as f:
        f.write(json.dumps(list_, sort_keys=True, ensure_ascii=False,
                           indent=4, separators=(',', ':'),))
        if len(list_) % 50 == 0:
            print('总数', len(list_))


def get_api(url,  headers={}):
    try:
        r = requests.get(url, headers=headers)
        data = json.loads(r.text)
        return data
    except BaseException as e:
        print('死了', e)
        time.sleep(15)
        return None


def 土味情话(i):
    url = 'https://api.uomg.com/api/rand.qinghua?format=json'
    val = get(get_api(url), 'content', '')
    return {'name': '每日一句情话', 'text': val}


def 扇贝每日一句(i=0):
    today = datetime.date.today()
    d = str(today - datetime.timedelta(days=i))
    url = f'https://apiv3.shanbay.com/weapps/dailyquote/quote/?date={d}'
    val = get_api(url)
    name = get(val, 'author', '')
    text = get(val, 'translation', '')
    return {'name': name, 'text': text}


# def 金山每日一句():
#     url = 'http://open.iciba.com/dsapi/'


def 每日一句(i):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
        'Referer': 'https://api.vvhan.com/api/ian?type=json',
        'Host': 'api.vvhan.com',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Sec-Fetch-Site': 'same-origin',
    }
    url = 'https://api.vvhan.com/api/ian?type=json'
    val = get(get_api(url, headers=headers), 'ishan', '')
    return {'name': '每日一句鸡汤', 'text': val}


def main():
    res = get_res()
    n = 900
    fun = [每日一句, 扇贝每日一句, 土味情话]
    for i in range(n):
        if (i+1) % 30 == 0:
            time.sleep(3)
        if (i+1) % 300 == 0:
            time.sleep(300)
        for j, f in enumerate(fun):
            time.sleep(0.2)
            print('获取数据', i, j)
            val = f(i+900)
            if val != None:
                res.append(val)
            save_res(res)
    save_res(res)


main()
