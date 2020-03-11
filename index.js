const fastify = require("fastify");
const app = fastify();

const { Engine } = require("json-rules-engine");

let engine = new Engine();

engine.addRule({
  conditions: {
    all: [
      {
        fact: "temperature",
        operator: "equal",
        value: 100
      }
    ]
  },
  onSuccess(){
    console.log('on success called')
  },
  onFailure(){
    console.log('on failure called')
  },
  event: {
    type: "message",
    params: {
      data: "hello-world!"
    }
  }
});

const facts = { temperature: 100 };

engine
  .run(facts)
  .then(results => {
    results.events.map(event => console.log('value', event.params.data));
  })
  .catch((error)=> console.log('err is', error));

app.listen(3000, () => {
  console.log("Your app is running");
});
