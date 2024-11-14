const questionsEnv = [

  // Environmental 
  // Ingredients
  // Pollution of Soil
  {
   text: "Do you take any steps to ensure that your raw materials and ingredients do not contribute to soil pollution? e.g., avoiding pesticides and herbicides harmful to soil health?",
   Section: "A",
   Title: "Pollution of Soil",
   Industry:"Ingredients",
   Category: "Environmental",
   options: [
     { id: 0, text: "Yes, we have stringent policies and practices to ensure our raw materials and ingredients do not contribute to soil pollution", score: 2 },
     { id: 1, text: "We have some measures in place, but there is room for improvement in ensuring our raw materials are environmentally friendly", score: 1 },
     { id: 2, text: "No, we do not have specific measures to ensure our raw materials do not contribute to soil pollution", score: 0 },
   ],
 },

 // Environmental 
 // Ingredients
 // Substances of concern and high concern

 {
   text: "Do you use any substances of concern in your ingredients?",
   Section: "B",
   Title: "Substances of concern and high concern",
   Industry:"Ingredients",
   Category: "Environmental",
   options: [
     { id: 0, text: "No, we strictly avoid substances of concern in our ingredients", score: 2 },
     { id: 1, text: "We have policies in place to minimize the use of substances of concern, but there might be occasional exceptions", score: 1 },
     { id: 2, text: "Yes, we use substances of concern in some of our ingredients", score: 0 },
   ],
 },
 {
   text: "Do you have any criteria you use to screen and select ingredients for your products in terms of safety and environmental impact?",
   Section: "B",
   Title: "Substances of concern and high concern",
   Industry:"Ingredients",
   Category: "Environmental",
   options: [
     { id: 0, text: "Yes, we have strict criteria and conduct thorough screening to ensure ingredient safety and minimal environmental impact", score: 2 },
     { id: 1, text: "We have some criteria in place, but they may not cover all aspects of safety and environmental impact", score: 1 },
     { id: 2, text: "No, we do not have specific criteria for ingredient selection based on safety and environmental impact", score: 0 },
   ],
 },

  // Environmental 
  // Ingredients
  //Ingredient sourcing
 {
   text: "Are your ingredients vegan?",
   Section: "C",
   Title: "Ingredient sourcing",
   Industry:"Ingredients",
   Category: "Environmental",
   options: [
     { id: 0, text: "Yes, all our ingredients are vegan", score: 2 },
     { id: 1, text: "Some of our ingredients are vegan, but not all", score: 1 },
     { id: 2, text: "No, none of our ingredients are vegan", score: 0 },
   ],
 },
  {
   text: "Do your ingredients contain palm oil?",
   Section: "C",
   Title: "Ingredient sourcing",
   Industry:"Ingredients",
   Category: "Environmental",
   options: [
     { id: 0, text: "Yes, all our ingredients contain palm oil", score: 2 },
     { id: 1, text: "Some of our ingredients contain palm oil, but not all", score: 1 },
     { id: 2, text: "No, none of our ingredients contain palm oil", score: 0 },
   ],
 },
 {
  text: "Do you take any measures to ensure transparency and traceability of ingredients sourced from suppliers?",
  Section: "C",
  Title: "Ingredient sourcing",
  Industry:"Ingredients",
  Category: "Environmental",
  options: [
    { id: 0, text: "Yes, we have robust systems in place to ensure transparency and traceability of ingredients from suppliers", score: 2 },
    { id: 1, text: "We have some measures in place, but they may not cover all aspects of transparency and traceability", score: 1 },
    { id: 2, text: "No, we do not have specific measures for ensuring transparency and traceability of ingredients from suppliers", score: 0 },
  ],
},

 // Environmental 
 // Packaging
 // Packaging materials
  {
   text: "What materials are commonly used in your packaging? e.g., plastic, glass, paper",
   Section: "D",
   Title: "Packaging materials",
   Industry:"Packaging",
   Category: "Environmental",
   options: [
     { id: 0, text: "Plastic is the primary material used", score: 2 },
     { id: 1, text: "A mix of plastic and other materials like glass or paper", score: 1 },
     { id: 2, text: "Non-plastic materials like glass or paper are primarily used", score: 0 },
   ],
 },

 // Environmental 
 // Transportation
 // Pollution of air
 {
  text: "Do you have any measures in place to reduce air pollution from your transportation practices?",
  Section: "E",
  Title: "Pollution of air",
  Industry:"Transportation",
  Category: "Environmental",
  options: [
    { id: 0, text: "We have implemented eco-friendly transportation practices such as using electric vehicles or optimizing routes to reduce emissions", score: 2 },
    { id: 1, text: "We are in the process of implementing eco-friendly transportation practices but they are not yet fully optimized", score: 1 },
    { id: 2, text: "We do not have specific measures in place to reduce air pollution from transportation", score: 0 },
  ],
},

// Environmental 
 // Transportation
//Pollution of water
{
  text: "Do you monitor and address water pollution issues in your supply chain?",
  Section: "F",
  Title: "Pollution of water",
  Industry:"Transportation",
  Category: "Environmental",
  options: [
    { id: 0, text: "Yes, we actively monitor and address water pollution issues in our supply chain", score: 2 },
    { id: 1, text: "We monitor water pollution issues in our supply chain but have not yet implemented comprehensive measures to address them", score: 1 },
    { id: 2, text: "No, we do not currently monitor or address water pollution issues in our supply chain", score: 0 },
  ],
},

// Environmental 
// Production
// Energy consumption and mix
{
  text: "Do you track how much energy you consume in your operations?",
  Section: "G",
  Title: "Energy consumption and mix",
  Industry:"Production",
  Category: "Environmental",
  options: [
    { id: 0, text: "Yes, we track and actively manage our energy consumption", score: 2 },
    { id: 1, text: "We track our energy consumption occasionally", score: 1 },
    { id: 2, text: "No, we do not track our energy consumption", score: 0 },
  ],
},

{
  text: "Do you use renewable or non-renewable sources of energy? ",
  Section: "G",
  Title: "Energy consumption and mix",
  Industry:"Production",
  Category: "Environmental",
  options: [
    { id: 0, text: "We use renewable energy sources exclusively", score: 2 },
    { id: 1, text: "We use a mix of renewable and non-renewable energy sources", score: 1 },
    { id: 2, text: "We primarily rely on non-renewable energy sources", score: 0 },
  ],
},

// Environmental 
// Production
// Pollution of water
{
  text: "Do you have any measures to minimize water pollution from production activities?",
  Section: "H",
  Title: "Pollution of water",
  Industry:"Production",
  Category: "Environmental",
  options: [
    { id: 0, text: "Yes, we have robust measures in place to minimize water pollution", score: 2 },
    { id: 1, text: "We have some measures but they are not comprehensive", score: 1 },
    { id: 2, text: "No, we do not have specific measures to minimize water pollution", score: 0 },
  ],
},

{
  text: "Do your products contain ingredients known to cause water pollution e.g. microplastics or other chemicals harmful to life?",
  Section: "H",
  Title: "Pollution of water",
  Industry:"Production",
  Category: "Environmental",
  options: [
    { id: 0, text: "No, our products do not contain any ingredients known to cause water pollution", score: 2 },
    { id: 1, text: "Some of our products contain trace amounts of ingredients that may contribute to water pollution, but we actively work to minimize their impact", score: 1 },
    { id: 2, text: "Yes, some of our products contain ingredients known to cause water pollution", score: 0 },
  ],
},

  // Environmental 
  // Production
  // Pollution of air
  {
    text: "Do you monitor sources of air emissions in your production facilities?",
    Section: "I",
    Title: "Pollution of air",
    Industry:"Production",
    Category: "Environmental",
    options: [
      { id: 0, text: "Our main sources of air emissions are well-defined and actively monitored with effective measures in place to minimize them", score: 2 },
      { id: 1, text: "We have identified some sources of air emissions but have limited measures in place to address them", score: 1 },
      { id: 2, text: "We have not extensively identified or addressed sources of air emissions in our production facilities", score: 0 },
    ],
  },
  {
    text: "Do you monitor and control air pollution from manufacturing processes?",
    Section: "I",
    Title: "Pollution of air",
    Industry:"Production",
    Category: "Environmental",
    options: [
      { id: 0, text: "Yes, we actively monitor and control air pollution from our manufacturing processes using advanced technologies and regular inspections", score: 2 },
      { id: 1, text: "We have some monitoring and control measures in place but they may not be comprehensive", score: 1 },
      { id: 2, text: "No, we do not actively monitor or control air pollution from our manufacturing processes", score: 0 },
    ],
  },

   // Environmental 
   // Production
   // Water consumption
   {
    text: "Do you use any water intensive processes in manufacturing beauty products?",
    Section: "J",
    Title: "Water Consumption ",
    Industry:"Production",
    Category: "Environmental",
    options: [
      { id: 0, text: "Yes, we use water-intensive processes extensively in our manufacturing", score: 0 },
      { id: 1, text: "We use water-intensive processes to some extent in certain manufacturing stages", score: 1 },
      { id: 2, text: "No, we do not use water-intensive processes in our manufacturing", score: 2 },
    ],
  },

  // Environmental 
  // Production waste
  // Pollution of water
  {
   text: "Does your company implement waste water treatment systems?",
   Section: "K",
   Title: "Pollution of water",
   Industry:"Production waste",
   Category: "Environmental",
   options: [
     { id: 0, text: "Yes, we have advanced wastewater treatment systems that meet or exceed regulatory standards", score: 2 },
     { id: 1, text: "We have basic wastewater treatment systems but are looking to improve them", score: 1 },
     { id: 2, text: "No, we do not have wastewater treatment systems in place", score: 0 },
   ],
 },

 // Environmental 
 // Production waste
 // Pollution of soil
 {
  text: "Do you responsibly manage and dispose waste materials generated during production?",
  Section: "L",
  Title: "Pollution of soil",
  Industry:"Production waste",
  Category: "Environmental",
  options: [
    { id: 0, text: "We have implemented comprehensive waste management practices including recycling and responsible disposal methods", score: 2 },
    { id: 1, text: "We have basic waste management practices in place but they could be improved", score: 1 },
    { id: 2, text: "We do not have specific waste management practices in place", score: 0 },
  ],
 },
 {
  text: "Do you have measures in place to prevent soil contamination from waste? ",
  Section: "L",
  Title: "Pollution of soil",
  Industry:"Production waste",
  Category: "Environmental",
  options: [
    { id: 0, text: "Yes, we have strict measures and protocols in place to prevent soil contamination from waste", score: 2 },
    { id: 1, text: "We have some measures in place but they could be improved", score: 1 },
    { id: 2, text: "No, we do not have specific measures in place to prevent soil contamination from waste", score: 0 },
  ],
 },

// Environmental 
// Production waste
// Waste
{
  text: "Do you recycle your waste?",
  Section: "M",
  Title: "Waste",
  Industry:"Production waste",
  Category: "Environmental",
  options: [
    { id: 0, text: "No, waste is not recycled", score: 0 },
    { id: 1, text: "Some waste is recycled", score: 1 },
    { id: 2, text: "All waste is recycled", score: 2 },
  ],
 },

 // Environmental 
 // Production waste
 // Packaging
{
  text: "Do you design packaging to minimize material usage and waste generation?",
  Section: "N",
  Title: "Packaging",
  Industry:"Distribution",
  Category: "Environmental",
  options: [
    { id: 0, text: "No, packaging design doesn't consider material usage and waste minimization", score: 0 },
    { id: 1, text: "Some efforts are made to minimize material usage and waste generation in packaging design", score: 1 },
    { id: 2, text: "Packaging design is optimized to minimize material usage and reduce waste generation", score: 2 },
  ],
 },


//  SOCIAL
// Characteristics of the undertaking’s workforce 
{
  text: "Do you have any measures in place to promote diversity and inclusion within your workforce?",
  Section: "O",
  Title: "Characteristics of the undertaking’s workforce ",
  Category: "Social",
  options: [
    { id: 0, text: "No specific measures in place", score: 0 },
    { id: 1, text: "Some measures are in place but limited", score: 1 },
    { id: 2, text: "Comprehensive measures are in place, actively promoting diversity and inclusion", score: 2 },
  ],
},
{
  text: "Do you take any measures to ensure equal opportunities and fair treatment of employees?",
  Section: "O",
  Title: "Characteristics of the undertaking’s workforce ",
  Category: "Social",
  options: [
    { id: 0, text: "No specific measures in place", score: 0 },
    { id: 1, text: "Some measures are in place but limited", score: 1 },
    { id: 2, text: "Comprehensive measures are in place, actively ensuring equal opportunities and fair treatment", score: 2 },
  ],
},
{
  text: "Do you offer any initiatives to support health and well-being of employees?",
  Section: "O",
  Title: "Characteristics of the undertaking’s workforce ",
  Category: "Social",
  options: [
    { id: 0, text: "No specific measures in place", score: 0 },
    { id: 1, text: "Some initiatives are available but limited", score: 1 },
    { id: 2, text: "Comprehensive initiatives are offered, actively supporting health and well-being", score: 2 },
  ],
},
{
  text: "Do you actively promote work-life balance?",
  Section: "O",
  Title: "Characteristics of the undertaking’s workforce ",
  Category: "Social",
  options: [
    { id: 0, text: "Minimal focus on work-life balance, limited initiatives", score: 0 },
    { id: 1, text: "Some efforts towards promoting work-life balance", score: 1 },
    { id: 2, text: "Strong emphasis on promoting work-life balance with comprehensive initiatives", score: 2 },
  ],
},
{
  text: "Do you have policies in place to ensure workplace safety?",
  Section: "O",
  Title: "Characteristics of the undertaking’s workforce ",
  Category: "Social",
  options: [
    { id: 0, text: "Limited or basic safety policies in place", score: 0 },
    { id: 1, text: "Adequate safety policies with periodic reviews and updates", score: 1 },
    { id: 2, text: "Robust safety policies with regular training, audits, and continuous improvement", score: 2 },
  ],
},
{
  text: "Do you provide fair and competitive compensation for your workforce?",
  Section: "O",
  Title: "Characteristics of the undertaking’s workforce ",
  Category: "Social",
  options: [
    { id: 0, text: "No, we pay below industry standards", score: 0 },
    { id: 1, text: "Yes, we provide competitive pay within the industry standards", score: 1 },
    { id: 2, text: "We provide competitive pay above industry standards", score: 2 },
  ],
},
{
  text: "Do you take measures to ensure your suppliers and contractors comply with labor and safety standards?",
  Section: "O",
  Title: "Characteristics of the undertaking’s workforce ",
  Category: "Social",
  options: [
    { id: 0, text: "No, we do not have measures in place", score: 0 },
    { id: 1, text: "Yes, we have some measures but they are not comprehensive", score: 1 },
    { id: 2, text: "Yes, we have comprehensive measures to ensure compliance", score: 2 },
  ],
},

// haracteristics of non-employees in undertaking’s workforce e.g. contractors, freelancers, temporary workers
 {
   text: "Do you have any measures in place to promote diversity and inclusion among your non-employees within your workforce?",
   Section: "P",
   Title: "Characteristics of non-employees in undertaking’s workforce e.g. contractors, freelancers, temporary workers",
   Category: "Social",
   options: [
     { id: 0, text: "No specific measures in place", score: 0 },
     { id: 1, text: "Some measures are in place but limited", score: 1 },
     { id: 2, text: "Comprehensive measures are in place, actively promoting diversity and inclusion", score: 2 },
   ],
 },
 {
   text: "Do you take any measures to ensure fair wages, working hours and benefits for non-employee workers?",
   Section: "P",
   Title: "Characteristics of non-employees in undertaking’s workforce e.g. contractors, freelancers, temporary workers",
   Category: "Social",
   options: [
     { id: 0, text: "No, we do not have measures in place", score: 0 },
     { id: 1, text: "Yes, we have some measures but they are not comprehensive", score: 1 },
     { id: 2, text: "Yes, we have comprehensive measures to ensure fair wages, working hours and benefits", score: 2 },
   ],
 },
 {
   text: "Do you offer any initiatives to support the health and well-being of non-employees?",
   Section: "P",
   Title: "Characteristics of non-employees in undertaking’s workforce e.g. contractors, freelancers, temporary workers",
   Category: "Social",
   options: [
     { id: 0, text: "No specific initiatives in place", score: 0 },
     { id: 1, text: "Some initiatives are available but limited", score: 1 },
     { id: 2, text: "Comprehensive intiatives are offered , actively supporting health and well-being", score: 2 },
   ],
 },
 {
  text: "Do you actively promote work-life balance for non-employees?",
  Section: "P",
  Title: "Characteristics of non-employees in undertaking’s workforce e.g. contractors, freelancers, temporary workers",
  Category: "Social",
  options: [
    { id: 0, text: "Minimal focus on work-life balance, limited initiatives", score: 0 },
    { id: 1, text: "Some efforts towards promoting work-life balance", score: 1 },
    { id: 2, text: "Strong emphasis on promoting work-life balance with comprehensive initiatives", score: 2 },
  ],
},

 // GOVERNANCE
 //Management of relationship with suppliers
 {
   text: "Do you enforce any professional conduct policies on suppliers?",
   Section: "Q",
   Title: "Management of relationship with suppliers",
   Category: "Governance",
   options: [
     { id: 0, text: "We do not enforce any professional conduct policies on suppliers", score: 0 },
     { id: 1, text: "We have professional conduct policies, but enforcement is inconsistent", score: 1 },
     { id: 2, text: "We have strict, consistently enforced professional conduct policies for all suppliers", score: 2 },
   ],
 },

 // Confirmed incidents of corruption or bribery
 {
   text: "What measures have you taken to prevent incidents of corruption or bribery at your company?",
   Section: "R",
   Title: "Confirmed incidents of corruption or bribery",
   Category: "Governance",
   options: [
     { id: 0, text: "We have not implemented any specific measures to prevent corruption or bribery", score: 0 },
     { id: 1, text: "We have basic measures in place, such as a code of conduct, but enforcement is limited", score: 1 },
     { id: 2, text: "We have comprehensive anti-corruption and anti-bribery policies with regular audits and training programs for employees", score: 2 },
   ],
 },
];

export default questionsEnv;
