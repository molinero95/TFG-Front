import { ApplicationState } from "../applicationState";

export class RouterUtils {

    public static ModelSelected(): boolean {
        return ApplicationState.model != null;
    }

    public static ModelAndVersionSelected(): boolean {
        return ApplicationState.model != null && ApplicationState.model.activeVersion != null;
    }
    
}