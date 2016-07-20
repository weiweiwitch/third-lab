export class Insertion {

	sort(input) {

		for (let j = 1; j < input.items.length; j++) {
			this.configTimeOut(input, j);
		}
	}

	configTimeOut(input, j: number) {
		console.log('发布超时行为，在：' + 1000 * j + 's后');

		// 设置超时
		setTimeout(() => {
			// 获取当前值
			let key = input.items[j].val;

			let i = j - 1;

			// 从后往前排序
			while (i >= 0 && input.items[i].val > key) {
				input.items[i + 1].val = input.items[i].val;
				i = i - 1;
			}

			input.items[i + 1].val = key;
			input.setCurrent(input.items[i + 1]);

		}, 1000 * j);
	}

}
