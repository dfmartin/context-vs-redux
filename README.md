# Redux vs Context

There is much discussion around the use of [Redux](https://react-redux.js.org/) vs [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext).

This repo puts together a very quick, _very_ **simple** (emphasis on "simple") sample app to compare the use of both approaches. First I want to say that I do not believe that a developer/project needs to make a sweeping decision to always use one over the other. There are good reasons to mix the use of both in appropriate situations.

> NOTE: I use [Typescript](https://www.typescriptlang.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) throughout.

## PERFORMANCE

I did not include any performance benchmarks. React performance is already fairly good for most applications.

## SAMPLE APP COMPLEXITY

I wanted to put together a sample that did a couple of things that I have found necessary.
|chunk|description|
| :--- | :--- |
| App | data that is germane to the application as a whole. For example: the current user.|
| Feature One | A feature that has its own domain that is separate from all other features |
| Feature Two | Another feature that has its own domain that is separate from all other features |
| Feature Children | Child components that utilize domain data within the feature it is used |

### app

Many applications make use of state that is used across the entire application regardless of what feature the user is current in. An example of this may be the current user. The application may store the user's roles that are used by multiple features, while also storing the user's email that is used by other features.

### feature one / feature two

A feature is some large chunk of functionality that could conceivably constitute a stand-alone application. Many examples are single feature: blog, todo list, etc. Many line-of-business applications provide multiple features that are akin to sub-applications, and are used in isolation - meaning the UI is such that the user "switches" between features and doesn't use them in concert.

> _example_
>
> - Client Management Feature
>   - searching for clients
>   - editing a single client
> - Product Management Feature
>   - searching for products
>   - editing a single product
>   - even if you can search for products ordered by specific clients this possibly does not rely on the current state of the client management feature.
>     - it probably does not take into account the client that the user previously selected while in the client management feature.
>     - these two features
> - Both features may use the current user in restricting search results or editing ability.

### child components

- Child components can fall into two categories
  - those that are used solely within a single feature
  - those that are "common" and may be used across different features

### caveats

- "domain" here does _not_ imply the use of Domain Driven Design (DDD)

## RESULTS

### rendering

From this sample we can see that rendering is the same, in that changes in particular areas of the application have the same affect on which components get re-rendered.

- Making a change to application state causes all children to re-render. This is the same for `useContext` and redux.
- Making a change to a feature causes only that feature to re-render. This is the same for `useContext` and redux.

### boiler plate

**The `useContext` approach** requires the developer to repeat the entire structure for storing, accessing, and changing data. Some of this may be able to be extracted into "helper" functions/components. But essentially each feature has to:

- create a context
- define its state shape and initial state
- provide reducers
- export a `<Provider />` component
- from a feature consumption point of view this could mean creating a top level "container" component that simply wraps the real feature with the provider

That `<Provider />` introduces a limitation - state from one feature cannot be used by another feature without lifting the original feature up, and this will ruin the re-rendering. Now, this re-use does go against the original description of a feature being isolated from other features. However, there is a related issue: re-usable components. If a child component uses the context of the feature it cannot be used outside of that context. The child component would need to revert to use of props. The complexity of that child component may make it desireable for it to have its own context to prevent the need to drill those props.

**The redux approach** has its own boiler plate, but there is a certain amount that is lifted up and is no longer considered boiler plate.

> NOTE: I am using [Redux Toolkit](https://redux-toolkit.js.org/) here.
> The boiler plate stuff is:

- create state slices
- define state shape and provide initial state
- provide reducers

As you can see there is less boiler plate. One thing that helps this is that there is no need to create a provider for each and therefore there is no need to wrap each feature in a `<Provider />` component. The entire app is wrapped in a Redux provider.
Feature isolation is achieved via the defining of specific state slices/reducers. However, this separation is convention in that developers need to be aware that a particular branch of state belongs to a specific feature and should not be used/changed by other features. But this does set us up if that requirement changes. It also allows for easier rearrangement/partitioning of state.

## CONCLUSION

Both `useContext` and redux approaches result in similar re-rendering. However, the redux approach provides the most flexibility should requirements change (and we all know that the requirements _never_ change :wink:). Both approaches take some getting used to. There are some other important considerations:

- Redux has a lot of documentation and community support. Your developers cannot go to [stackoverflow](https://stackoverflow.com) and search for how to use your particular flavor of state management
- Redux has a good implementation of middleware. While it is possible to have middleware in the `useContext` approach it can be clunky and again, no documentation - no google.

WINNER: Redux with Redux-Toolkit

## ONE MORE THING

Do not take this to mean that `useContext` should be completely tossed out. There still exist scenarios where it will make more sense.
