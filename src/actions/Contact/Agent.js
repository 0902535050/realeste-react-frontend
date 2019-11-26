import * as types from '../../constants/Contact/Agent'
export const actGetListAgents =(agents) =>{
    return {
        type: types.GET_LIST_AGENTS,
        agents: agents
    }
}

export const actGetInfoAgent = (agent)  => {
    return {
        type: types.GET_INFO_AGENT,
        agent: agent
    }
}

export const actGetListProjectOfAgent = (projects) => {
    return{
        type: types.GET_LIST_PROJECT_OF_AGENT,
        projects: projects
    }
}