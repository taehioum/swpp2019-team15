# swpp2019-team15

Rev. 1.0 2019-10-05 - initial version
Rev. 2.0 2019-11-02 - updated user story and UI

### Project Requirements and Specification<br>

**Öga**<br>
Requirements and Specification Document<br>

### Project Abstract<br>

Öga is a location based Q&A service, where users' questions regarding a location are forwarded to other users in that location. Its name, meaning eye in Swedish, implies the nature of the questions--it only requires a glance of an eye to answer. The name also hints at the service's nature; where questions and answers are "오고가다" amongst users--a term meaning to and fro in Korean.<br>
There are often occasions when we want to acquire information about a place minutes before arriving. For instance, you may want to know how many seats are available before entering a restaurant or café. But it would be bothersome and inefficient to call all candidate restaurants. Picture this: You want to know how long the current queue is for Gwanak02 as you approach NakSeong Station. If it's too long, riding a different bus would be the smarter option. If you could correctly grasp the circumstance, your decision-making process would be greatly improved.<br/><br/>
Öga connects you with people who are at/near the location at the moment while maintaining the anonymity of users. Moreover, Öga provides a slight sense of bonding and affinity, as users share one thing in common--they will be in the same place sooner or later. These feelings will in turn, encourage users to ask and answer questions.

### Customer<br>

Living in a modern, fast-paced era means that many people are often looking for ways to maximize time efficiency and reduce wasted effort. With this in mind, Öga targets customers who are constantly moving around and changing positions throughout the day, unlike normal office workers. Additionally, Öga is also a useful software for anyone who wants to obtain information about a place prior to visiting. Similar customers who like to provide and receive help from others with the glance of an eye and touch of a finger would benefit greatly from this service.<br/><br/>
For our initial implementation and testing phase, this software will mainly target SNU students looking for efficient ways to survey the status of a place on campus before visiting; and gradually increase the customer range to cover a larger population for future iterations.

### Competitive Landscape<br>

**Competitors: Question and Answer Services**<br>
Öga's competitor would be Question and Answer Services like Quora, Stackoverflow, and Naver Jiski-iN.
Öga's questions and answers are focused around a certain location, and take almost zero effort to ask and reply. Quora and Stackoverflow, on the other hand, mainly focus on technical questions that require effort to both ask and answer. Thus, speed would be a comparative advantage that Öga has over Quora or Stackoverflow. <br/><br/>
Compared to Stackoverflow and Quora, Naver Jisik-iN, takes care of a wider range of questions, and it takes less user effort to answer. However, allowing less user effort leads to poor quality answers in which users have to offer points known as 'Nae-Gong' in order to receive better answers. Öga prevents this issue by providing a predefined set of questions and answers, so that less effort does not lead to poor quality answers. Moreover, unlike Jisik-iN, where questions are viewed by everyone, Öga forwards the question to targetted users at a certain location, so that reponses are faster and more accurate.

**Competitor: Social Network Services**<br>
Öga's other competitor would be Social Network Services like Twitter and KaKaoTalk that provide user communication.
Users on Twitter often "tweet" about a certain location via hashtags. A user might post a tweet asking about seats in the library, or post that the line in front of the cafeteria is absurdly long. These tweets, can be a competitor to Öga. However, these tweets are shown to users following a certain hashtag, and there is no guarantee that the user is at that location. By choosing to ask people at the selected location, Öga has an advantage over Twitter.<br/><br/>
Messenger services like KakaoTalk can also be a competitor, as users can directly ask their friends about a location. However, users would have to know in advance whether their friends are at the location, or first inquire about their friends' locations. Using Öga, users can skip these cumbersome phases and obtain the information they need in a more efficient manner.

### User Stories<br>

**User Story #1 _(Sprint 2)_**<br>

- **Feature:** Sending a question to people in a target location
- **Actors:** Question sender looking for a seat in the library
- **Precondition:** The question sender has to be a registered user and logged in.
- **Trigger:** The question sender clicks `SEND A QUESTION` button
- **Scenario:**

  1. The question sender clicks the `SEND A QUESTION` button
  2. The page displays various pictograms which allows the user to select the type of question. (E.g. seats / weather).
  3. After the user has selected a pictogram, the user searches a location from the map. (E.g. SNU library).
  4. The page displays a map of the desired area/available locations and shows a graphic user interface with a set of pre-made location-specific questions.
  5. The user will select an adequate question and press the `SEND` button.

- **Exceptions:** When the user clicks the `SEND` button without selecting the question type/target area/location/question.
- **Acceptance Test:**
  Given the user has filled out all the required fields to create a question, when the user clicks on the `SEND` button, the user should see the page display `Your question has been sent successfully`.

**User Story #2 _(Sprint 2)_**<br>

- **Feature:** Answering a question from push notification
- **Actors:** A responder near the library (or target destination)
- **Precondition:** The question sender and responder have to be registered users and logged in, and responders have to be near the target location.
- **Trigger:** Question responder will receive a push notification saying `You've got questions to answer`.
- **Scenario:**

  1. The responder agrees to recieve a push notification from the settings page.
  2. The responder is off the service, listening to youtube.
  3. The responder receives a notification prompting that question for the user has arrived.
  4. The responder clicks the the browser notification and is redirected to the reply page. 
  5. The page displays a range of answers for the user to select based on the location-specific question.
  6. The responder selects an answer by clicking on an adequate pictogram and presses the `ANSWER` button to submit his/her response.

- **Exceptions:** When the responder clicks the `RESPOND` button without selecting the pictogram of an answer.
- **Acceptance Test:**
  Given the responder has chosen an answer for the question and clicked the `ANSWER` button, then the responder should see `Your answer has been sent successfully.`

**User Story #3 _(Sprint 3)_**<br>

- **Feature:** Rating the answer
- **Actors:** A question sender who received a wrong answer from a question responder to his/her question
- **Precondition:** The question sender has to be a registered user and logged in. Also he/she must have a previous record of at least one unrated answer to his/her question.
- **Trigger:** The question sender will receive a notification saying `You received an answer.`
- **Scenario:**

  1. The question sender receives a notification saying `You received an answer.`
  2. The question sender will rate the answer by clicking on an adequate pictogram which displays a satisfaction scale and presses the `RATE` button to submit the rating.

- **Exceptions:** When the question sender has already rated the answer or clicks `RATE` without first selecting a pictogram.
- **Acceptance Test:**
  Given the question sender has chosen an pictogram for the answer and clicked the `RATE` button, the question sender should see a page displaying `Thank you. Your response has been successfully recorded.`

**User Story #4 _(Sprint 3)_**<br>

- **Feature:** Answering a question from the main page
- **Actors:** A user reading the feeds on the main page
- **Precondition:** The user must have agreed on location sharing.
- **Trigger:** The user clicks an unanswered question from the main page.
- **Scenario:**

  1. The user is redirected to the reply page of the question.
  2. The user will answer the question by the same steps introduced in User Story #2.4.
  3. The user will be redirected to the main page.

- **Exceptions:** The question is answered by someone else while the user is redirected to the reply page.
- **Acceptance Test:**
  Given the responder has chosen an answer for the question and clicked the `ANSWER` button, then the responder should see `Your answer has been sent successfully.`

**User Story #5 _(Sprint 3)_**<br>

- **Feature:** Subscribing to a question from the main page
- **Actors:** A user reading the feeds on the main page
- **Precondition:** The user must have agreed on location sharing and notification subscription.
- **Trigger:** The user clicks a subscribe button of an unanswered question from the main page.
- **Scenario:**

  1. The subscribe button the question is turned on.
  2. The user will be notified when the question is answered.
  3. Upon clicking the notification, user will be redirected to the questions detail page.

- **Exceptions:** The user tries to subscribe without notification subscription.
- **Acceptance Test:**
  The user should get a push notification within a reasonable amount of time after it has answered.

**For Future Iterations**

Users will be able to receive or view submitted questions in two ways. One is when the user logs in, the page displays a map with map markers of the user's surrounding location. Each map marker indicates a question submitted by a user. The other way is by receiving notifications forwarded to users located nearby the target destination. The user can choose whether he/she wants to voluntarily answer queries by clicking on map markers or answer upon receiving notifications from a question sender.

If a user is not able to get a reponse from another user at a location, the user will get a machine generated answer, based on past answer records.

The main page will be automatically updated via websockets, instead the user having to refresh it.

### User Interface Requirements<br>

![ui image](https://github.com/swsnu/swpp2019-team15/blob/master/mockup_ver2.png)
User Interface requirements for the current sprint will focus on asking, receiving, answering, and rating questions. The pages that provide these functions should be accessible from the main page.

**User Interface Components**<br>

- **Signin Page:** Users can login by entering username, password, and clicking the login button. Users will be led to the `Main Page`.
- **Signup Page:** Users can sign up by entering username, password, and password confirmation. Appropriate error message(duplicate username, conflicting passwords) will be displayed.
- **Settings Page:** Users can click buttons to enable/disable location tracking and push notification subscription.
- **Main Page:** Users can view the questions they have asked, ask new question, and view a question from another users. Clicking an already asked and answered question will lead to `Detail Page`. Clicking a new question button will lead to `Question Page`. Clicking a question from another user will lead to `Reply Page`. A floating ribbon menu will be provided, that lead to `Profile Page` and offer other functions like setting and logout.
- **Detail Page:** Users can view their questions with a image of the map, and can rate the answers if it has been answered by other users.
- **Question Page:** Users will choose a pictogram depicting the questions they would like to ask, and click the GPS button. The GPS button will lead to the `Map Page`, from which the users will choose a location they are interested in. When the two inputs are provided, an autogenerated text of the question will be shown. Clicking submit will forward the question to other users, and the user is redirected to the `Main Page`.
- **Reply Page:** Users will be provided with pictograms, a slider, or a stepper button based on the type of answers the question expects. Clicking the location will take the user to `Map Page`, where they can check the exact location. Choosing appropriate answer and clicking the submit button will redirect the user to the `Main Page`.
- **Map Page:** The `Map Page` provides a slightly different view based on modes. In asking mode, users can search the place they are interested in via the search bar. In answering mode, the user can view the detailed location the question is interested in.
- **Profile Page:** The `Profile Page` provides users with their profile information. Users can check the number of questions answered, asked, and see their personal achievements. These will act as a form of non-monetary incentive.
- **Push Notifications:** Using service workers, users who have agreed on getting push notifications will receive notifications regarding questions answered, and new questions. This notifications can be received even when the user has not opened the web page.
