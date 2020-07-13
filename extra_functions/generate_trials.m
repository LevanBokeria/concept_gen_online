% Script to just generate 42 trials formatted as javascript objects,
% containing names of paired-associates to be shown during study 2
% experiment.

%% General setup
clear; clc;

dbstop if error;

nTargets = 3;

nEmpties = 13;

for iT = 1:nTargets
    namesTarget{iT,1} = ['T' int2str(iT)];
end

for iE = 1:nEmpties
    namesEmpty{iE,1} = ['E' int2str(iT)];
end

namesEverything = [namesTarget; namesEmpty];

allCombos = combnk(namesEverything,2);

% Clean out trials with both empties
idx_clean = [];
for iComb = 1:size(allCombos,1)
    
    if contains(allCombos{iComb,1},'E') & contains(allCombos{iComb,2},'E')
        idx_clean = [idx_clean, iComb];
    end
   
end

% Delete them
allCombos(idx_clean,:) = [];

%% Now create a string that looks like javascript object
js_string = '';

for iComb = 1:size(allCombos,1)
    
    
    thisLine{iComb,1} = ['{item1: "' allCombos{iComb,1} '", item2: "' allCombos{iComb,2} '"}'];
    
    
end
