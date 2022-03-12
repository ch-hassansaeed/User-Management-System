import { IListItem } from './types';

export const getItemList = () => {
  return JSON.parse(localStorage.getItem('itemList') || '[]') as IListItem[];
};

export const setItemList = (text: string) => {
  const trimmedText = text.trim();
  const createdAt = new Date().toString();
  const currentItemList = getItemList();
  const newItem = {} as IListItem;

  if (trimmedText) {
    newItem.value = trimmedText;
    newItem.createdAt = createdAt;
  } else return alert('Invalid value. Please correct and try again.');

  if (currentItemList.length) {
    const maxOrder = Math.max(...currentItemList.map((item) => item.order));
    newItem.order = maxOrder + 1;
    const newItemList = currentItemList;
    newItemList.push(newItem);
    localStorage.setItem('itemList', JSON.stringify(newItemList));
  } else {
    newItem.order = 1; //starting # from 1 if no item exists.
    localStorage.setItem('itemList', JSON.stringify([newItem]));
  }
};

export const updateItemList = (itemList: IListItem[]) => {
  localStorage.setItem('itemList', JSON.stringify(itemList));
};
