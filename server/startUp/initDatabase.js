const professionMock = require('../mock/professions.json');
const qualitiesMock = require('../mock/qualities.json');
const Professions = require('../models/Profession');
const Qualities = require('../models/Quality');

module.exports = async () => {
  const professions = await Professions.find();
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Professions, professionMock);
  }
  const qualities = await Qualities.find();
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Qualities, qualitiesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
      data.map(async (item) => {
        try {
          delete item._id;
          const newItem = new Model(item);
          await newItem.save();
          return newItem;
        } catch (e) {
          console.log(e.message);
          return e.message;
        }
      }),
  );
}
