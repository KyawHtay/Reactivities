import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import ActivityDetails from "../dteails/ActivityDetails";
import ActivityForm from "../../../form/ActivityForm";



export default observer(function ActivityDashboard(){
    const {activityStore} = useStore()
    const {selectedActivity,editMode} =activityStore
    return (

        <Grid>
            <Grid.Column width='10'>``
            <ActivityList />
            </Grid.Column>
            <GridColumn width='6'>
                { selectedActivity && !editMode &&
                    <ActivityDetails />
                }
                {editMode &&
                    <ActivityForm />
                }
                
            </GridColumn>
        </Grid>
    )
})