//Export functions
export function updateRow(row){
  return { type: 'UPDATE_ROW', payload: row}
}

export function updateSecretData(data){
  return { type: 'UPDATE_SECRETDATA', payload: data}
}

export function updateModalAddItem(){
  return { type: 'UPDATE_MODAL_ADDITEM' }
}

export function updateModalSellItem(){
  return { type: 'UPDATE_MODAL_SELLITEM' }
}

export function calculateTable (tableLength){

  let tableHeight = 0;
  if (tableLength <= 1){
    return { type: 'UPDATE_TABLEHEIGHT', payload: '100px' }
  }else if ( tableLength === 2) {
    return { type: 'UPDATE_TABLEHEIGHT', payload: '150px' }
  }else if ( tableLength === 3) {
    return { type: 'UPDATE_TABLEHEIGHT', payload: '200px' }
  }else if ( tableLength === 4) {
    return { type: 'UPDATE_TABLEHEIGHT', payload: '250px' }
  }else {
    return { type: 'UPDATE_TABLEHEIGHT', payload: '300px' }
  }
}
