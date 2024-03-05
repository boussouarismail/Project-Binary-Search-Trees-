let arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 9, 23, 6345, 9, 9, 9, ];

class Node {
    constructor(d=null)
    {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array){
        this.arr = array;
        this.root = new Node();
    }

    mergeSort(array) {

        if (array.length == 1) return;
    
        let leftArr;
        let rightArr;
    
        leftArr = array.slice(0, array.length/2);
        rightArr = array.slice(array.length/2, array.length);
        
        this.mergeSort(leftArr);
        this.mergeSort(rightArr);
    
        this.merge(leftArr, rightArr, array);
    }
    
    merge(leftArr, rightArr, array) {
        let leftSize = leftArr.length;
        let rightSize = rightArr.length;
        let i=0; let l=0; let r=0;
    
        while (l<leftSize && r<rightSize) {
            if (leftArr[l] < rightArr[r]) {
                array[i] = leftArr[l];
                i++ ;
                l++ ;
            }else{
                array[i] = rightArr[r];
                i++;
                r++;
            }
        }
        while (l<leftSize ) {
            array[i] = leftArr[l];
            i++ ;
            l++ ;
        }
        while (r<rightSize) {
            array[i] = rightArr[r];
            i++;
            r++;
        }
         
    }

    removeDuplicates(array){
        for (let i = 0; i < array.length; i++) {
            for (let j = i+1; j < i+2; j++) {
                if (array[i] == array[j]) {
                    array.splice(j, 1);
                    j--;
                }
            }
        }
    }

    buildBalance(array = this.arr, node){
        if (array.length <= 1 && array[0]!== null) {
            node.data = array[0] ;
            return;
        }
        let mid = Math.floor(array.length/2) ;
        node.data = array[mid];
        let arrLeft = array.slice(0,mid);
        let arrRight = array.slice(mid+1,array.length);
        node.left = new Node();
        node.right = new Node();
        this.buildBalance(arrLeft, node.left);
        this.buildBalance(arrRight, node.right);

    }

    buildTree(array = this.arr){
        this.mergeSort(array);
        this.removeDuplicates(array);
        this.buildBalance(array,this.root);
        //this.prettyPrint(this.root);
        return this.root;
    }

    prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value, tree = this.root){
        let node = new Node(value);
        if (!tree.data) {
            tree.data = value; 
            return;  
        }
        if (tree.data == node.data) {
            console.log("data already exist!!!");
            return;
        }
        if (!tree.right || !tree.left) {
            if (tree.data < node.data) {
                tree.right = node;
                return;
            }
            if (tree.data > node.data) {
                tree.left = node;
                return;
            }
            return;
        }
        if (tree.data < node.data) {
            if (!tree.right) {
                tree.right = node; 
                 
            }else{
                this.insert(value, tree.right);
            }
             
            return;             
        }
        if (tree.data > node.data ) {
            if (!tree.left) {
                tree.left = node;       
            }else{
                this.insert(value, tree.left);
            } 
            return;
                       
        }
          
    }

    leaf(node){
        if (node) {
            if (node.left && node.right) {
                return false;     
            }   
        }
        return true;
    }

    findPredeccessor(node){
        if (node.left){
            if (node.left.data) {
                return this.findPredeccessor(node.left);   
            }
        }     
        if (node.right ){
            if (node.right.data) {
                let nodeData = node.data;
                this.deleteItem(node.data, node);
                return nodeData; 
            }
            
        }
            
        let node1 = node.data;
        node.data = undefined;
        return node1;        
    }

    findeSuccessor(node){
        if (node.right){
            if (node.right.data) {
                return this.findeSuccessor(node.right);     
            } 
        }
            
        if (node.left){
            if (node.left.data) {
                let nodeData = node.data;
                return this.findeSuccessor(node.right);  
            }
            return this.deleteItem(node.data, node);
        }

        let node1 = node.data;
        node.data = undefined;
        console.log(node1);
        return node1;
        
    }

    deleteItem(value, tree = this.root){
        if (tree) {
            //this.trim(tree);
            if (tree.data === value) {
                if (tree.right) {
                    if (tree.right.data) {
                        tree.data = this.findPredeccessor(tree.right); 
                        this.trim(tree);
                        return tree.data;           
                    }  
                    /*
                    if (!tree.right.data ) {
                        tree.right = null;
                    } 
                    */
                }
                if (tree.left) {
                    if (tree.left.data){
                        tree.data = this.findeSuccessor(tree.left);
                        this.trim(tree);
                        return tree.data;
                    }
                    /*
                    if (!tree.left.data) {
                        tree.left = null;
                    } 
                    */  
                } 
                tree.data = undefined;
                return;
                
            } 
            if (tree.data > value) {
                this.deleteItem(value, tree.left);
            }
            if (tree.data < value) {
                this.deleteItem(value, tree.right);
            }
            return tree.data;    
        }else{
            console.log("data not exist");
            return ;
        } 
        
    }

    find (value, tree = this.root){
        if (tree) {
            if (tree.data == value) {
                return tree;   
            }
            if (tree.data < value) {
                if (tree.right) {
                    return this.find (value, tree.right);  
                }
                console.log("node not exist");
                return false;
            }
            if (tree.data > value) {
                if (tree.left) {
                    return this.find (value, tree.left);   
                }
                console.log("node not exist");
                return false;
            }   
        }
        console.log("tree empty");
        return false; 
    }

    trim (tree = this.root){
        if (tree) {
            if (tree.right) {
                if (tree.right.data) {
                    this.trim (tree.right);
                } else {
                    tree.right = null
                }
            }
            if (tree.left) {
                if (tree.left.data) {
                    this.trim (tree.left);
                } else {
                    tree.left = null;
                }
            }
        }
    }

    testCallBack (node){
        if (node) {
            if (node.data) {
                node.data = 1;   
            }
        }else{
            console.log("no node!!!")
        }
    }

    levelOrder(call){
        let Q = [this.root];
        let arr = [];
        let j = 0;
        
        while (Q[0]) {
            if (call && typeof(call) === "function") {
                call(Q[0]);
            }
            if (Q[0].left) {
                if (Q[0].left.data) {
                    Q.push(Q[0].left);
                }     
            }
            if (Q[0].right) {
                if (Q[0].right.data) {
                    Q.push(Q[0].right);
                }     
            }
            arr[j] = Q[0].data;
            Q.shift();
            j++;
        }
        if (!call) {
            console.log(arr);
            return arr;
        } 
    }

    levelOrderRecursion (tree = [this.root], call) {
        let arr = [];
        while (tree[0]) {
            if (tree[0].data) {
                if (call && typeof(call) === "function") {
                    call(tree[0]);
                }else{
                    arr.push(tree[0].data);
                }

                if (tree[0].left) {
                    if (tree[0].left.data) {
                        tree.push(tree[0].left); 
                    }
                }
                if (tree[0].right) {
                    if (tree[0].right.data) {
                        tree.push(tree[0].right); 
                    }
                }
                tree.shift();  
            }
        } 
            return arr.concat(this.levelOrder(tree, call));
    }

    inOrder (call, tree = this.root) {
        if (call && typeof(call) === "function") {
            call(tree);
        }
        if (tree.left && tree.right) {
            if (tree.left.data && tree.right.data) {
                return [this.inOrder(call, tree.left), tree.data, this.inOrder(call, tree.right)].flat();
            }
        }
        if (tree.left) {
            if (tree.left.data) {
                return [this.inOrder(call, tree.left), tree.data].flat();
            }  
        }
        if (tree.right) {
            if (tree.right.data) {
                return [tree.data, this.inOrder(call, tree.right)].flat(); 
            }  
        }   
        return [tree.data].flat();        
    }

    preOrder (call, tree = this.root) {
        if (call && typeof(call) === "function") {
            call(tree);
        }
        if (tree.left && tree.right) {
            if (tree.left.data && tree.right.data) {
                return [ tree.data, this.preOrder(call, tree.left), this.preOrder(call, tree.right)].flat();
            }
        }
        if (tree.left) {
            if (tree.left.data) {
                return [ tree.data, this.preOrder(call, tree.left)].flat();
            }  
        }
        if (tree.right) {
            if (tree.right.data) {
                return [tree.data, this.preOrder(call, tree.right)].flat(); 
            }  
        }   
        return [tree.data].flat();
    }

    postOrder (call, tree = this.root) {
        if (call && typeof(call) === "function") {
            call(tree);
        }
        if (tree.left && tree.right) {
            if (tree.left.data && tree.right.data) {
                return [ this.postOrder(call, tree.left), this.postOrder(call, tree.right), tree.data].flat();
            }
        }
        if (tree.left) {
            if (tree.left.data) {
                return [this.postOrder(call, tree.left), tree.data].flat();
            }  
        }
        if (tree.right) {
            if (tree.right.data) {
                return [this.postOrder(call, tree.right), tree.data].flat(); 
            }  
        }   
        return [tree.data].flat();   
    }

    height (node = this.root) {
        let hL = 0;
        let hR = 0;
        if (node) {
            if (node.left) {
                if (node.left.data) {
                    hL = 1 + this.height(node.left);   
                } 
            }
            if (node.right) {
                if (node.right.data) {
                    hR = 1 + this.height(node.right);   
                } 
            }
            return hL > hR ? hL : hR;       
        }

    }

    depth (node = this.root, tree = this.root) {
        let deep = 0;
        if (!tree) {
            return;
        }
        if (tree.data > node.data) {
            if (tree.left) {
                deep = 1 + this.depth(node, tree.left);
            }
        }
        if (tree.data < node.data) {
            if (tree.right) {
                deep = 1 + this.depth(node, tree.right);
            }
        }
        if (tree.data == node.data) {
            if (tree.data) {
                return 0;
            }
        }

        return deep;
    }

    isBalanced (tree = this.root) {
        let hL = 0; 
        let hR = 0;
        if (tree) {
            if(tree.left) hL = this.height(tree.left);
            if(tree.right) hR = this.height(tree.right);
            if (!tree.right && !tree.left) {
                return true;   
            }
            if (Math.abs(hL - hR) > 1) {
                console.log(hL);
                console.log(hR);
                return false;
            }
            return this.isBalanced(tree.right) && this.isBalanced(tree.left);
        }
        return true;
        
    }
    rebalance(tree = this.root){
        let array = this.inOrder(tree);
        console.log(array);
        this.buildTree(array);
    }
}

function randomArray(elmnsNbr) {
    let arr = [];
    for (let i = 0; i < elmnsNbr; i++) {
        arr[i] = Math.floor( Math.random()*100);
    }
    return arr;
}

function randomInsert(elmnsNbr, tree) {
    for (let i = 0; i < elmnsNbr; i++) {
        let num = Math.floor( Math.random()*50); 
        tree.insert(num);
    } 
}


//Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
let myTree = new Tree(randomArray(10));
myTree.buildTree();
//Confirm that the tree is balanced by calling isBalanced.
console.log(myTree.isBalanced());
myTree.prettyPrint(myTree.root);
//Print out all elements in level, pre, post, and in order.
console.log(myTree.preOrder());
console.log(myTree.postOrder());
console.log(myTree.inOrder());
//Unbalance the tree by adding several numbers > 100.
randomInsert(50, myTree);
console.log(myTree.inOrder());
//Confirm that the tree is unbalanced by calling isBalanced.
console.log(myTree.isBalanced());
//Balance the tree by calling rebalance.
myTree.rebalance();
//Confirm that the tree is balanced by calling isBalanced.
console.log(myTree.isBalanced());
//Print out all elements in level, pre, post, and in order.
console.log(myTree.preOrder());
console.log(myTree.postOrder());
console.log(myTree.inOrder());

myTree.prettyPrint(myTree.root);
