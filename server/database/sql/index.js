'use strict'

var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

function sql(file) {
    var fullPath = path.join(__dirname, file); // generating full path;
    var options = {
        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true,
        // Showing how to use static pre-formatting parameters -
        // we have variable 'schema' in each SQL (as an example);
        params: {
            //schema: 'public' // replace ${schema~} with "public"
            schema: 'PSalgadas'
        }
    };
    return new QueryFile(fullPath, options);
    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an external SQL file or to
// keep it in-line (hard-coded):
//
// - Size / complexity of the query, because having it in a separate file will let you develop
//   the query and see the immediate updates without having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple versions commented
//   out in the query file.
//
// In fact, the only reason one might want to keep a query in-line within the code is to be able
// to easily see the relation between the query and its formatting parameters. However, this is
// very easy to overcome by using only Named Parameters for your query formatting.
////////////////////////////////////////////////////////////////////////////////////////////////

// We import only a few queries here, while using the rest in-line in the code, only to provide a
// diverse example here, but you may just as well put all of your queries into SQL files.

module.exports = {
    trees: {
        all: sql('trees/all.sql'),
        get: sql('trees/get.sql'),
        getInterventions: sql('trees/getInterventions.sql'),
        postIntervention: sql('trees/postIntervention.sql'),
        getIntervention: sql('trees/getIntervention.sql'),
        updateIntervention: sql('trees/updateIntervention.sql')
    },
    interventions: {
        all: sql('interventions/all.sql'),
        allWithState: sql('interventions/allWithState.sql'),
        get: sql('interventions/get.sql'),
        put: sql('interventions/put.sql'),
        csv: sql('interventions/csv.sql'),
        filter: sql('interventions/filter.sql')
    }
};