const FeaturesTypeEnum = {
    group: 'group',
    collapsable: 'collapsable',
    basic: 'basic',
};
Object.freeze(FeaturesTypeEnum);
const FeaturesStatusEnum = {
    active: 'active',
    suspended: 'suspended',
};
Object.freeze(FeaturesStatusEnum);
const userState = {
    newInvalidCode: 'newInvalidCode',
    old: 'old',
};
Object.freeze(userState);
const featureStatus = {
    active: 'active',
    notActive: 'notActive',
};
Object.freeze(featureStatus);

module.exports = {
    FeaturesTypeEnum, FeaturesStatusEnum, userState, featureStatus,
};
