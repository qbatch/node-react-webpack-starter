const links = [
  {
    id: 1,
    url: 'http://graphql.org/',
    description: 'The Best Query Language'
  },
  {
    id: 2,
    url: 'http://dev.apollodata.com',
    description: 'Awesome GraphQL Client'
  },
];

export default {
  // Query: {
  //   allLinks: () => links,
  // },
  // Mutation: {
  //   createLink: (_, data) => {
  //     const newLink = Object.assign({ id: links.length + 1 }, data);
  //     links.push(newLink);
  //     return newLink;
  //   }
  // },
  Query: {
    allLinks: async (root, data, { mongo: { Links } }) => { // 1
      return await Links.find({}).toArray(); // 2
    },
  },

  Mutation: {
    createLink: async (root, data, {mongo: {Links}}) => {
      const response = await Links.insert(data); // 3
      return Object.assign({id: response.insertedIds[0]}, data); // 4
    },
  },
  Link: {
    id: root => root._id || root.id, // 5
  },
};
