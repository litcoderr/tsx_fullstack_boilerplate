class Node{
	constructor(data, next = null, before = null){
		this.data = data;
		this.before = before;
		this.next = next;
	}
}

function default_compare_func(input_node, compared_node){
	// return true if input is smaller than compared_node
	return input_node.data < compared_node.data
}

class LinkedList{
	constructor(compare_func = null, validation_func = (cur, before, next) => true){
		this.compare_func = compare_func;	
		if(this.compare_func == null){
			this.compare_func = default_compare_func;
		}
		this.validation_func = validation_func;

		this.head = null;
		this.length = 0;
	}

	push(data){
		let newNode = new Node(data);
		let valid = true;
		if(!this.head){
			this.head = newNode;	
		}else{
			let index = 0; // node index to compare
			let compare_node = this.head;
			let before_node = null;
			while(index<this.length){
				let append = this.compare_func(newNode, compare_node);
				if(append){
					break;
				}else{
					before_node = compare_node;
					compare_node = compare_node.next;
					index += 1;
				}
			}
			valid = this.validation_func(newNode, before_node, compare_node);
			if(valid){
				if(index==0){ // newNode is head
					newNode.next = compare_node;
					compare_node.before = newNode;
					this.head = newNode;
				}else if(index==this.length){  // newNode is last
					newNode.before = before_node;	
					before_node.next = newNode;
				}else{ // somewhere in the middle
					newNode.before = before_node;
					newNode.next = compare_node;

					before_node.next = newNode;
					compare_node.before = newNode;
				}
			}
		}
		if(valid){
			this.length += 1;
			return true
		}else{
			return false	
		}
	}

	toList(){
		let result = [];
		let currentNode = this.head;
		while(currentNode != null){
			result.push(currentNode.data);
			currentNode = currentNode.next
		}
		return result
	}

	pop(data, equal_func = (i1, i2) => {return i1 == i2}){
		let currentNode = this.head;
		while(currentNode != null){
			if(equal_func(data, currentNode.data)){
				break;	
			}else{
				currentNode = currentNode.next
			}
		}
		if(currentNode != null){
			let before = currentNode.before;
			let next = currentNode.next;
			if(before == null){
				this.head = next
			}

			if(before != null) before.next = next;
			if(next != null) next.before = before;
			this.length -= 1;
			return true;
		}else{
			return false;
		}
	}

}

export default LinkedList;

