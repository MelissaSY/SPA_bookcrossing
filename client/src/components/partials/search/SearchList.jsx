import React, { useEffect, useState } from 'react'

function ListComponent({selectedItems, setSelected,
    showParameters, allItems, itemsName, filterFunction}) {
    const [searchItems, setSearchItems] = useState('');
    const [filteredItems, setFiltered] = useState([]);
    
    useEffect(() => {
        filterItems(searchItems);
    }, [selectedItems])

    const filterItems = (inputString) => {
        setSearchItems(inputString);
        let selected = selectedItems.filter(
            (item)=> {
                return (filterFunction(item, inputString))
                })
        let otherItems = allItems.filter(
            (item) => { 
                return (filterFunction(item, inputString) &&
                !selected.some(element => item.id === element.id))
            }
        )
        setFiltered(selected.concat(otherItems));
    }
    
    const handleSearchItems = (e) => {
        filterItems(e.target.value);
    }

    const handleSelect = (item) => {
        if(!selectedItems.some(selected => item.id === selected.id)) {
            setSelected(selected => [...selected, item])
        } else {
            let newSelected = selectedItems.filter(selected => selected.id !== item.id);
            if(filteredItems === selectedItems) {
                setFiltered(newSelected);
            }
            setSelected(newSelected);
        }
    }
    return (
        <>
        <input type='text' placeholder={itemsName} value={searchItems} onChange={handleSearchItems}/>
        <div className='search-elements'>
        {
            filteredItems.map((item) => {
                let className = 'border-bottom-pink';
                if(selectedItems.some(selected => item.id === selected.id)) {
                    className += ' pink-background'
                } else {
                    className += ' white-background'
                }
                return (
                    <input type='button' key={item.id} value={showParameters.map((param) => {return item[param]}).join(' ')} className={className} 
                    onClick={()=>handleSelect(item)}/>
                )
            })
        }
        </div>
        </>

    )

}

export default ListComponent;