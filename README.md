# react-mui-multiselect-dropdown

> Made with create-react-library
It is simple dropdown like package. Where you can get results on search,

## Dependencies
 "react": v-16.0.0,
 "@material-ui/core": v-4.11.0,
 "@material-ui/icons": v-4.9.1,

## Install

```bash
npm install --save react-mui-multiselect-dropdown
```

## Demo
[here](https://stackblitz.com/edit/react-nrp7vw/)
## Usage
### Multi select
```jsx
import React, { Component } from 'react'
import OnSearchResult from 'on-search-result'

class Example extends Component {
  render() {
    return <OnSearchResult
        fullWidth
        data={data}
        placeHolder="Select Employee"
        itemLabel="name"
        itemId="id"
        itemValue="id"
        onItemSelect={(val) => { console.log(val); }}
        onInputKeywordChange={(keyword) => { searchData(keyword); }}
        customStyles={{ checkBox: classes.checkBox }}
        simpleValue
        multiple
      />
  }
}
```
### Single select
```jsx
import React, { Component } from 'react'
import Dropdown from 'react-mui-multiselect-dropdown'

class Example extends Component {
  render() {
    return  <Dropdown
                data={employees}
                fullWidth
                searchable
                searchPlaceHolder='search employee...'
                itemId='id'
                itemLabel='name'
                simpleValue
                searchByValue='name'
                itemValue='id'
                selectedValues={selectedEmployee}
                customStyles={{
                  error: classes.error,
                  checkBox: classes.checkBox
                }}
                errorText='error'
                onItemClick={(records) => {
                  setSelectedEmployees(records)
                }}
                onDeleteItem={(deleted) => {
                  console.log('deleted', deleted)
                }}
              />
  }
}
```
### Multi select
```jsx
import React, { Component } from 'react'
import OnSearchResult from 'on-search-result'

class Example extends Component {
  render() {
    return  <Dropdown
                data={skills}
                fullWidth
                searchable
                searchPlaceHolder='search...'
                itemId='id'
                itemLabel='name'
                multiple
                simpleValue
                imageLabel='path'
                searchByValue='name'
                itemValue='id'
                selectedValues={selectedSkills}
                customStyles={{
                  error: classes.error,
                  checkBox: classes.checkBox
                }}
                errorText='error'
                onItemClick={(records) => {
                  setSelectedSkills(records)
                }}
                onDeleteItem={(deleted) => {
                  console.log('deleted', deleted)
                }}
              />
  }
}
```
## Props
| Attribute | Type |  Is Required | Description | Default Value |
| ------ | ------ |  ------ |  ----| ----|
| data | array |  Yes |list of data to display| 
| PlaceHolder | string|No| Placeholder for the search section |Search records
| itemLabel | string|Yes | label to display when item is clicked it should be from one of the property in data.|
| itemId | number/ string| Yes |Unique id from to data which will use as unque key for the list it ca be id from the list of data.
| simpleValue |boolean | No | if true then proided itemValue wiill be retrun in respose from the selected options else whole selected object will return. eg: if item value is 'id' and simple value is true then we will get selected option as list of if from the data.Else will get whiole object.|
| itemValue | number/string  | No | It will only work if the simple value is true it can be any property from the data for instance id you will get list of id's on item select.
| loading | boolean |No | if true then there is spinner while fetching data| False
| multiple |boolean | No | if true then you can select multiple options | False
| notFoundText | string | No | text to display when no item found on search | No records found
| customStyles | makeSTyle Instance| No | custom styles for the checkbox|{}

---

| Event | Return| Description |
| ------ | ------ | ----|
| onInputKeywordChange | input value |It will trigger when input value changes you will get types keyword. You can use that keyword to filter data or fetch data from the API.  |
| onItemSelect | Selected items| It will trigger once you click on item / select item for simple value it will return the selected list of itemvalue for the multiselect of item value of single select else list of slected list for multiselect or selected object for single select.

