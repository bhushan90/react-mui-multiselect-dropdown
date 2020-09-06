import React, { useEffect, useState } from 'react'
import Dropdown from 'react-mui-multiselect-dropdown'
import { Paper, Grid, Typography, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.dark,
    fontSize: '1em'
  },
  checkBox: {
    color: 'Purple'
  }
}))

function DemoDropdown() {
  const [selectedEmployee, setSelectedEmployees] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedCities, setSelectedCities] = useState([])

  const [skills, setSkills] = useState([])
  const [employees, setEmployees] = useState([])
  const [cities, setCities] = useState([])

  const populateData = () => {
    const employeesData = [
      { id: 1, name: 'Bhushan' },
      { id: 2, name: 'Vishal' },
      { id: 3, name: 'Ravindra' }
    ]
    employees.forEach((v, i) => {
      v['path'] = `https://source.unsplash.com/random/${i}`
    })

    setEmployees(employeesData)
    const skillsData = [
      { id: 1, name: 'React Js' },
      { id: 2, name: 'Angular' },
      { id: 3, name: 'Node JS' }
    ]

    setSkills(skillsData)
    const SelectedEmp = []
    setSelectedEmployees(SelectedEmp)

    const SelectedSkills = []
    setSelectedSkills(SelectedSkills)

    const cities = [
      { id: 1, city: 'MUMBAI' },
      { id: 2, city: 'PUNE' },
      { id: 3, city: 'NAGPUR' }
    ]

    cities.forEach((v, i) => {
      v['path'] = `https://source.unsplash.com/random/${i}`
    })

    setCities(cities)
  }

  useEffect(() => {
    populateData()
  }, [])

  const classes = useStyles()

  return (
    <>
      <div>
        <Grid container>
          <Grid item lg={4} style={{ margin: 'auto', marginTop: '20vh' }}>
            <Paper style={{ padding: '2em 10px' }}>
              <Typography
                variant='h6'
                style={{ color: 'tomato', marginTop: '1em' }}
              >
                Single Select
              </Typography>
              <Dropdown
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
              <Typography
                variant='h6'
                style={{ color: 'tomato', marginTop: '1em' }}
              >
                Multi Select
              </Typography>
              <Dropdown
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
              <Typography
                variant='h6'
                style={{ color: 'tomato', marginTop: '1em' }}
              >
                Select with Image
              </Typography>
              <Dropdown
                data={cities}
                fullWidth
                searchable
                searchPlaceHolder='search cities...'
                itemId='id'
                itemLabel='city'
                imageLabel='path'
                searchByValue='city'
                showImage
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
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default DemoDropdown
