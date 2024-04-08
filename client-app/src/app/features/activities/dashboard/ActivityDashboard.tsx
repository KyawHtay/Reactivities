import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import { useEffect } from "react";
import LoadingComponent from "../../../layout/loadingComponent";



export default observer(function ActivityDashboard(){
    const {activityStore} = useStore() 
    const {loadActivities,activityRegistry} =activityStore

    useEffect(()=>{
      if(activityRegistry.size <=1) loadActivities();
    },[loadActivities,activityRegistry])
  
  
   if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
    return (

        <Grid>
            <Grid.Column width='10'>``
            <ActivityList />
            </Grid.Column>
            <GridColumn width='6'>
               <h2>Activity Filter</h2>
            </GridColumn>
        </Grid>
    )
})