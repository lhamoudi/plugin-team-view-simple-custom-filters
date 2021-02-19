
import { FiltersListItemType } from "@twilio/flex-ui";

const customActivityFilter = (appState, teamFiltersPanelProps) => {
    const activitiesArray = Array.from(appState.worker.activities.values());

    const activities = (activitiesArray).map((activity) => ({
        value: activity.name,
        label: activity.name,
        default: !!activity.available,
    }));

    return {
        id: "data.activity_name",
        fieldName: "custom_activity_name",
        type: FiltersListItemType.multiValue,
        title: "Activities",
        options: activities
    };
};

const customSkillFilter = (appState, teamFiltersPanelProps) => {

    let skillsArray = [];
    if (appState.supervisor.workers) {
        appState.supervisor.workers.forEach(worker => {
            if (worker.worker.attributes.skills) {
                let skills = worker.worker.attributes.skills;
                skills.forEach(skill => {
                    if (skillsArray.indexOf(skill) === -1) {
                        skillsArray.push(skill);
                    }
                });
            }
        });
    }

    const skills = (skillsArray).sort().map((skill) => ({
        value: skill,
        label: skill,
    }));

    return {
        id: "data.attributes.skills",
        fieldName: "custom_skill_name",
        type: FiltersListItemType.multiValue,
        title: "Skills",
        options: skills
    };
};

const customCountryFilter = (appState, teamFiltersPanelProps) => {

    let countriesArray = [];
    if (appState.supervisor.workers) {
        appState.supervisor.workers.forEach(worker => {
            if (worker.worker.attributes.country_code) {
                let countryCode = worker.worker.attributes.country_code;
                if (countryCode && countriesArray.indexOf(countryCode) === -1) {
                    countriesArray.push(countryCode);
                }
            }
        });
    }

    const countries = (countriesArray).sort().map((country) => ({
        value: country,
        label: country,
    }));

    return {
        id: "data.attributes.country_code",
        fieldName: "custom_country_name",
        type: FiltersListItemType.multiValue,
        title: "Country Codes",
        options: countries
    };
};

// Add new filter to TeamFiltersPanel in the Flex UI
export const extendFilter = (manager) => {
    manager.updateConfig({
        componentProps: {
            TeamsView: {
                filters: [
                    customActivityFilter,
                    customSkillFilter,
                    customCountryFilter,
                ]
            }
        }
    })
};