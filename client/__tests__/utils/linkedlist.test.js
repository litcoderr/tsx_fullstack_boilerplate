import LinkedList from '../../utils/linkedlist'

describe('LinkedList push test', ()=>{
	it('test when empty list', ()=>{
		let list = new LinkedList();
		expect(list.toList()).toStrictEqual([]);
		expect(list.length).toBe(0);
	});
	it('test when input is head', ()=>{
		let list = new LinkedList();
		let input = 3;
		
		list.push(input);
		expect(list.toList()).toStrictEqual([3]);
		expect(list.length).toBe(1);
	});
	it('test when input is last', ()=>{
		let list = new LinkedList();
		let input = 3;
		let last = 10;

		list.push(input);
		list.push(last);
		expect(list.toList()).toStrictEqual([3, 10]);
		expect(list.length).toBe(2);
	});
	it('test when input is neither head or last', ()=>{
		let list = new LinkedList();
		let input = 3;
		let middle = 5;
		let last = 10;

		list.push(input);
		list.push(last);
		list.push(middle);
		expect(list.toList()).toStrictEqual([3, 5, 10]);
		expect(list.length).toBe(3);
	});
	it('test custom compare func', ()=>{
		let list = new LinkedList((cur, before, next)=>{
			return true; // insert no matter what	
		});
		let smaller = 3;
		let bigger = 10;

		list.push(smaller);
		list.push(bigger);
		expect(list.toList()).toStrictEqual([10, 3]);
		expect(list.length).toBe(2);
	})
});

describe('LinkedList pop test', ()=>{
	it('test pop existing node', ()=>{
		let list = new LinkedList();
		let inputs = [3, 4, 1, 6, 2, 10];

		inputs.forEach((val, index)=>{
			list.push(val)	
		});
		
		list.pop(3);
		expect(list.toList()).toStrictEqual([1, 2, 4, 6, 10]);
		expect(list.length).toBe(5)
	});
	it('test pop non-existing node', ()=>{
		let list = new LinkedList();
		let inputs = [3, 4, 1, 6, 2, 10];

		inputs.forEach((val, index)=>{
			list.push(val)	
		});
		
		list.pop(7);
		expect(list.toList()).toStrictEqual([1, 2, 3, 4, 6, 10]);
		expect(list.length).toBe(6)
	});
	it('test custom equal function for pop', ()=>{
		let list = new LinkedList();
		let inputs = [3, 4, 1, 6, 2, 10];

		inputs.forEach((val, index)=>{
			list.push(val)	
		});
		
		list.pop(-1, (i1, i2)=>{
			return i1 == -1 * i2 // true when both integers are opposite
		});
		expect(list.toList()).toStrictEqual([2, 3, 4, 6, 10]);
		expect(list.length).toBe(5)
	})
});
