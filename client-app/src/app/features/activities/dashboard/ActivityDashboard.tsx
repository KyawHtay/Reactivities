import { Grid ,GridColumn} from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../dteails/ActivityDetails";
import ActivityForm from "../../../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm : (id:string)=>void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
    submiiting: boolean;

}

export default function ActivityDashboard({activities,selectedActivity,selectActivity,cancelSelectActivity,editMode,openForm,closeForm,createOrEdit,deleteActivity,submiiting}: Props){
    return (

        <Grid>
            <Grid.Column width='10'>``
            <ActivityList 
                activities={activities}  
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
                submitting={submiiting}/>
            </Grid.Column>
            <GridColumn width='6'>
                { selectedActivity && !editMode &&
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelSelectActivity={cancelSelectActivity}
                        openForm ={openForm}  
                    />
                }
                {editMode &&
                    <ActivityForm 
                        closeForm={closeForm} 
                        activity={selectedActivity} 
                        createOrEdit={createOrEdit} 
                        submitting={submiiting}/>
                }
                
            </GridColumn>
        </Grid>
    )
}