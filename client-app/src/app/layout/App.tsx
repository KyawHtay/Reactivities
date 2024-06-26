import { useEffect, useState } from 'react'
import {Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuidv4} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';


function App() {
  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] =useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false)
  const [loading,setLoading] = useState(true);
  const [submitting,setSubmitting] = useState(false);

  useEffect(()=>{
    agent.Activities.list().then(response => {
      let activities: Activity[]=[];
      response.forEach((activity: Activity)=>{
        activity.date= activity.date.split('T')[0];
        activities.push(activity)
      })
      setActivities(activities);
      setLoading(false);
    })
  },[])

 function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id === id))
    console.log(id);
    id? setEditMode(false): setEditMode(true);
 }
 function handleFormOpen(id?:string){
  id? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
 }

 function handleDeleteActivity(id:string){

  setSubmitting(true);
  agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(x=>x.id !==id)])
    setSubmitting(false);
  })


 }

 function handleFormClose(){
  setEditMode(false);
 }
 function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
 }

 function handleCreateOrEditActivity(activity: Activity){
  console.log(activities.filter(x=>x.id!==activity.id));
  setSubmitting(true);

  if(activity.id){
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(x=>x.id!==activity.id),activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }else{

    activity.id=uuidv4();
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities,activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }
 }

 if(loading) return <LoadingComponent content='Loading app' />
  return (
  <>
    <NavBar openForm={handleFormOpen}/> 
    <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity ={handleSelectActivity}
          cancelSelectActivity ={handleCancelSelectActivity}
          editMode={editMode}
          openForm= {handleFormOpen}
          closeForm ={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submiiting ={submitting}
        />
    </Container>
 </>
  

  )
}

export default App
