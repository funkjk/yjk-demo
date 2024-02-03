import DiffMatchPatch from 'diff-match-patch';
const dmp = new DiffMatchPatch();

export default {
    toDeltaText(oldValue, newValue) {
        const diff = dmp.diff_main(oldValue, newValue)
        const delta = []
        for (let d of diff) {
            if (d[0] === DiffMatchPatch.DIFF_EQUAL) {
                delta.push({ retain: d[1].length })
            } else if (d[0] === DiffMatchPatch.DIFF_INSERT) {
                delta.push({ insert: d[1] })
            } else {
                delta.push({ delete: d[1].length })
            }
        }
        return delta
    }
}