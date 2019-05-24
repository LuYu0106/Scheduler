package edu.gatech.scheduler.service;

import edu.gatech.scheduler.domain.Task;
import edu.gatech.scheduler.domain.User;
import edu.gatech.scheduler.repository.TaskRepository;
import edu.gatech.scheduler.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weka.classifiers.trees.J48;
import weka.core.Debug;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.converters.ConverterUtils;

import java.util.*;

@Service
public class TreeService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    TaskRepository taskRepository;


    public Instances getDataSet(String loc) throws Exception {
        ConverterUtils.DataSource source = null;
        try {
            source = new ConverterUtils.DataSource(loc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return source.getDataSet();

        /*System.out.println(source.getDataSet().get(10));
        Instance ins = source.getDataSet().get(15);*/
    }

    public J48 buildClassifier(Instances dataSource) throws Exception {
        dataSource.randomize(new Debug.Random(123));
        if (dataSource.classIndex() == -1) {
            dataSource.setClassIndex(dataSource.numAttributes() - 1);
        }
        int seed = (int) Math.random() * 50 + 1;
        int folds = 5;
        // randomize data
        Debug.Random rand = new Debug.Random(seed);
        Instances randData = new Instances(dataSource);
        randData.randomize(rand);
        if (randData.classAttribute().isNominal())
            randData.stratify(folds);
        Instances target = randData.trainCV(folds, 2);
        Instances data = randData.testCV(folds, 2);
        data.randomize(new Debug.Random(789));
        J48 model = new J48(); // a decision tree with pruning
        ((J48)model).setConfidenceFactor(0.1f);
        model.buildClassifier(target);
        return model;
    }
/*
* @attribute tag {cs6300,cs6400,cs6200,cs6460,cs6035,cs6515,cs7647,cs6440,cs6310,cs7641}
@attribute education {Less than High School,High School,Bachelor's Degree,Master's Degree,Doctoral Degree}
@attribute industry {Agriculture,Arts,Construction,Consumer Goods,Corporate,Educational,Finance,Government,High Tech,Legal,Manufacturing,Media,Non-profit,Recreational,Service}
@attribute hours-per-week numeric
@attribute completed-tasks numeric
@attribute sex {Male,Female}
@attribute group numeric
@attribute class {Finished,NonFinish}
*
* */
    public Instance createNewInstance(Instances data, String tag, String edu, String indus, int  houiPerWeek, int complete, String sex, int groupnumebr  ){
        Instance instance = new DenseInstance(8);
        instance.setValue(data.attribute("tag"), tag);
        instance.setValue(data.attribute("education"), edu);
        instance.setValue(data.attribute("industry"), edu);
        instance.setValue(data.attribute("hours-per-week"), houiPerWeek);
        instance.setValue(data.attribute("completed-tasks"), complete);
        instance.setValue(data.attribute("sex"), sex);
        instance.setValue(data.attribute("group"), groupnumebr);
        instance.setValue(data.attribute("class"), "Finished");
        instance.setDataset(data);
        System.out.println("The instance: " + instance);
        return instance;
    }

    public String prediction(Instance instance, J48 model, Instances data) throws Exception {
        //   double actualclass = instance.classValue();
        //  String actual = data.classAttribute().value((int) actualclass);
        double predic = model.classifyInstance(instance);
        String preS = data.classAttribute().value((int) predic);
        return preS;
    }
  /* public static void main(String[] args) throws Exception {
       TreeService classifier = new TreeService();
        Instances instances =  classifier.getDataSet("src\\main\\resources\\assets\\schedulerdata.arff");
        J48 tree = classifier.buildClassifier(instances);

        Instance instance1 = classifier.createNewInstance(instances,"cs6300", "1", "2", 30,
                26,"Male", 2);
        classifier.prediction(instance1,tree,instances);
    }
    */

    public List<String[]> getRecommendation(String name) throws Exception {
        HashMap<String, String> mapToedu = new HashMap<>();
        HashMap<String, String> mapToins = new HashMap<>();

        mapToedu.put("Less than High School", "1");
        mapToedu.put("High School", "2");
        mapToedu.put("Bachelor's Degree", "3");
        mapToedu.put("Master's Degree", "4");
        mapToedu.put("Doctoral Degree", "5");


        mapToins.put("Agriculture","1");
        mapToins.put("Arts","2");
        mapToins.put("Construction","3");
        mapToins.put("Consumer Goods","4");
        mapToins.put("Corporate","5");
        mapToins.put("Educational","6");
        mapToins.put("Finance","7");
        mapToins.put("Government","8");
        mapToins.put("High Tech","9");
        mapToins.put("Manufacturing","10");
        mapToins.put("Media","11");
        mapToins.put("Non-profit","12");
        mapToins.put("Recreational","13");
        mapToins.put("Service","14");

        User user = userRepository.findByUsername(name);
        TreeService classifier = new TreeService();
        Instances instances =  classifier.getDataSet("src\\main\\resources\\assets\\schedulerdata.arff");
        J48 tree = classifier.buildClassifier(instances);

        String edu = mapToedu.get(user.getHighestEducation());
        String ind = mapToins.get(user.getIndustry());
        String sex = user.getGender();


        String userid = user.getId();
        Set<String> takenclass = new HashSet<>();

        List<Task> taks = taskRepository.findAllByCreateByUserId(userid);
        Set<String> classtaken = new HashSet<>();
        int completeTask = 0;
        int hour = 0;
        for (Task s: taks) {
            classtaken.add(s.getTag());
            if (s.isCompleted()) {
                completeTask++;
                hour += s.getEstimatedHours();
            }
        }
        int groupnumber = user.getGroupid()== null ? 0 : user.getGroupid().size();


        List<String[]> res = new ArrayList<>();

        String[] classes = new String[] {"cs6300", "cs6400", "cs6200","cs6460","cs6035","cs6515","cs7647","cs6440","cs6310","cs7641"};
        Map<String, String> classmap = new HashMap<>();
        classmap.put("cs6300", "Software Development Process");
        classmap.put("cs6400", "Database Systems Concepts and Design");
        classmap.put("cs6200", "Introduction to Operating Systems");
        classmap.put("cs6460", "Educational Technology");
        classmap.put("cs6035", "Introduction to Information Security");
        classmap.put("cs6515", "Intro to Graduate Algorithms");
        classmap.put("cs7647", "Machine Learning for Trading");
        classmap.put("cs6440", "Intro to Health Informatics");
        classmap.put("cs6310", "Software Architecture and Design");
        classmap.put("cs7641", "Machine Learning");


        for (int i = 0; i < classes.length; i++) {
            Instance instance1 = classifier.createNewInstance(instances, classes[i], edu, ind, hour,
                    completeTask, sex, groupnumber);
            String preiction_result = classifier.prediction(instance1, tree, instances);
            System.out.println(preiction_result);
            if (preiction_result.equals("Finished") && !classtaken.contains(classes[i])) {
                res.add(new String[]{classes[i], classmap.get(classes[i])});
            }
        }
        return res;
    }

}
