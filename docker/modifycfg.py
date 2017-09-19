import json
import argparse
from pprint import pprint

parser = argparse.ArgumentParser(description='config file')
parser.add_argument('-f', dest='configfile', action='store', help='目标配置文件路径')

args = parser.parse_args()

with open(args.configfile, 'r') as f:
	data = json.load(f)
	data['httpPort'] = 8181
	data['dbhost'] = '172.18.0.57'
	data['dbport'] = 3306
	data['dbname'] = 'tl'
	data['dbuser'] = 'root'
	data['dbpassword'] = '123456'
	pprint(data)
	with open(args.configfile, 'w') as ff:
		json.dump(data, ff)