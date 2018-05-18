export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTYR = 'ADD_ENTYR'

export function receiveEntries(entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries
    }
}

export function addEntry(entry) {
    return {
        type: ADD_ENTYR,
        entry,
    }
}