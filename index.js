const API_KEY = 'gIa5fp2yq3xXwV0YdAzs6g';
const axios = require("axios");


axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';

const request = async (url, method='GET', params={}) => {

    params['api_key'] = API_KEY;
    
    return await axios.request(url, {
        method: method,
        params: params
    });
}

const peopleSearchByDomain = async (domains) => {
    params = {
        q_organization_domains: domains.join('\n')
    }
    
    let response = await request('https://api.apollo.io/v1/mixed_people/search', 'POST', params);
    if(response.data && response.data.people){
        console.log(response.data.people.length);
        for(people of response.data.people){
            console.log(`${people.name} = ${people.email}`)
        }
        console.log(JSON.stringify(response.headers,null,2));  

    }else{
        console.log(JSON.stringify(response.data,null,2));
        console.log(JSON.stringify(response.headers,null,2));    
    }
};

const bulkEnrichPeople = async (peopleList) => {
    let params = {
        "api_key": "YOUR API KEY HERE",
        "reveal_personal_emails": true,
        "details": [
            {
                "first_name": "Tim",
                "last_name": "Zheng",
                "domain": "apollo.io",
                "email": "tim@apollo.io",
                "email_md5": "8d935115b9ff4489f2d1f9249503cadf",
                "email_sha256": "337dc0c1aad74f93af086dcf7dc0289f141c8ef5f44c3f104f07b0f03050ff49",
                "organization_name": "Apollo"
            },
            {
                "first_name": "Roy",
                "last_name": "Chung",
                "email": "roy@apollo.io",
                "email_md5": "7328fddefd53de471baeb6e2b764f78a",
                "email_sha256": "97817c0c49994eb500ad0a5e7e2d8aed51977b26424d508f66e4e8887746a152",
                "organization_name": "Apollo"
            }
        ]
    }
    // params.reveal_personal_emails = true;
    // params.reveal_phone_number = false;
    params.details = peopleList;
    console.log('start');
    let response = await request('https://api.apollo.io/api/v1/people/bulk_match', 'POST', params);
    console.log(JSON.stringify(response.data,null,2));
    console.log(JSON.stringify(response.headers,null,2));
};


const bulkEnrichOrganization = async (domain) => {
    return bulkEnrichOrganizations([domain]);
}

const bulkEnrichOrganizations = async (domains) => {
    let terms = {
        domains: domains
    };
    let response = await request('https://api.apollo.io/v1/organizations/bulk_enrich', 'POST', terms);
    console.log(JSON.stringify(response.data,null,2));
    console.log(JSON.stringify(response.headers,null,2));  
};

const findPerson = async (terms = {}) => {
    terms.reveal_personal_emails = true;
    terms.reveal_phone_number = false;
    let response = await request('https://api.apollo.io/v1/people/match', 'POST', terms);    
    console.log(JSON.stringify(response.data,null,2));
    console.log(JSON.stringify(response.headers,null,2));
};

const healthCheck = async () => {
    let response = await request('https://api.apollo.io/v1/auth/health');
    
    console.log(response.data);
};

const roseCompanyPeople = [
    {
        firstName:'Jonathan',
        lastName: 'Rose',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'Mike',
        lastName: 'Gomez',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'David',
        lastName: 'Rivera',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'Virginia',
        lastName: 'Plithides',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'Michael',
        lastName: 'Spangler',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'Joshua',
        lastName: 'Lomot',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'James',
        lastName: 'Wreschner',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'Ed',
        lastName: 'Surges',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'Scott',
        lastName: 'Anderson',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'Sharon',
        lastName: 'Tunstall',
        domain: 'rosecompanies.com',
    },
    {
        firstName:'Josh',
        lastName: 'Haggarty',
        domain: 'rosecompanies.com',
    },    
];

// healthCheck();
peopleSearchByDomain(['rosecompanies.com']);

//findPerson(roseCompanyPeople[0]);
// bulkEnrichOrganizations(['rosecompanies.com']);
