import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Casualty: a
    .model({
      location: a.string(),
      manualAddress: a.string(),
      incidentType: a.enum(['road_accident', 'medical', 'traffic', 'other']),
      date: a.datetime(),
      description: a.string(),
      imageUri: a.string(),
      isAccepted: a.boolean(),
      owner: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime()
    })
    .authorization((allow) => [allow.guest()]),

  Donation: a
    .model({
      foodType: a.enum(['hay', 'grass', 'fodder', 'waste', 'other']),
      quantity: a.integer(),
      unit: a.enum(['kg', 'bundles', 'bags']),
      location: a.string(),
      manualAddress: a.string(), // For manual address
      pickupTime: a.string(),
      contactName: a.string(),
      contactPhone: a.string(),
      isAccepted: a.boolean(),
      owner: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime()
    })
    .authorization((allow) => [allow.guest()]),

  Flocking: a
    .model({
      location: a.string(),
      manualAddress: a.string(), // For manual address
      herdSize: a.integer(),
      dateTime: a.datetime(), // Changed from time to dateTime
      description: a.string(),
      imageUri: a.string(),
      isAccepted: a.boolean(),
      owner: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime()
    })
    .authorization((allow) => [allow.guest()]),

  Garbage: a
    .model({
      location: a.string(), // For coordinates
      manualAddress: a.string(), // For manual address
      cattleCount: a.integer(),
      garbageType: a.enum(['household', 'market', 'restaurant', 'mixed', 'other']),
      description: a.string(),
      imageUri: a.string(),
      isAccepted: a.boolean(),
      owner: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime()
    })
    .authorization((allow) => [allow.guest()]),

  Adoption: a
    .model({
      name: a.string(),
      phone: a.string(),
      location: a.string(), // For coordinates
      manualAddress: a.string(), // For manual address
      occupation: a.string(),
      purpose: a.enum(['dairy', 'agriculture', 'shelter', 'other']),
      experience: a.string(),
      agreedToTerms: a.boolean(),
      isAccepted: a.boolean(),
      owner: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime()
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  }
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
