import { useEffect, useState } from "react";
import { useApiKey, requestFeedback, MissingApiKeyError } from "./ApiKeyProvider.jsx";

const MOBILE_STYLES = `
.tr-root {
  width: min(720px, 100% - 32px);
  margin: 0 auto;
  padding-bottom: clamp(32px, 5vw, 40px);
}
.tr-progress-bar-container {
  pointer-events: none;
}
.tr-progress-bar-container > * {
  pointer-events: auto;
}
.tr-progress-segment {
  flex: 1;
  display: block;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: auto;
  padding: 14px 0;
  margin: -14px 0;
}
.tr-btn {
  min-height: 44px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  font-size: clamp(12px, 1.4vw, 13px);
}
.tr-btn-small {
  min-height: 40px;
}
.tr-btn-link {
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  align-items: center;
  min-height: 36px;
}
.tr-h1 {
  font-size: clamp(22px, 4.5vw, 28px) !important;
  line-height: 1.25 !important;
}
.tr-intro-text {
  font-size: clamp(13px, 1.6vw, 14px) !important;
}
.tr-body {
  font-size: clamp(15px, 1.7vw, 15.5px) !important;
  line-height: clamp(1.65, 1.7vw, 1.75) !important;
}
.tr-section-h2 {
  font-size: clamp(13px, 1.5vw, 14px) !important;
}
.tr-question-prompt {
  font-size: clamp(15px, 1.7vw, 15.5px) !important;
}
.tr-textarea {
  font-size: 16px !important;
  min-height: 100px !important;
  padding: 12px !important;
}
.tr-diagram-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.tr-diagram-svg {
  width: 100%;
  height: auto;
  display: block;
}
.tr-diagram-frame {
  margin: clamp(24px, 4vw, 32px) 0;
  padding: clamp(14px, 2vw, 20px);
}
@media (max-width: 480px) {
  .tr-root {
    width: min(720px, 100% - 24px);
  }
  .tr-textarea {
    min-height: 120px !important;
    padding: 14px !important;
  }
  .tr-diagram-frame {
    margin-left: -12px !important;
    margin-right: -12px !important;
    padding: 14px 12px !important;
    border-left: none !important;
    border-right: none !important;
  }
  .tr-diagram-svg text {
    font-size: 13px;
  }
  .tr-diagram-svg text[data-small="1"] {
    font-size: 11px;
  }
  .tr-rating-row {
    gap: 8px !important;
  }
  .tr-rating-btn {
    flex: 1 1 30%;
  }
  .tr-progress-segment {
    padding: 22px 0 !important;
    margin: -22px 0 !important;
  }
}
`;

function useMobileStyles() {
  useEffect(() => {
    const id = "tr-mobile-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = MOBILE_STYLES;
    document.head.appendChild(el);
  }, []);
}

const SECTIONS = [
  {
    id: "intro",
    title: "1. The Imitation Game",
    content: `I propose to consider the question, "Can machines think?" This should begin with definitions of the meaning of the terms "machine" and "think." The definitions might be framed so as to reflect so far as possible the normal use of the words, but this attitude is dangerous. If the meaning of the words "machine" and "think" are to be found by examining how they are commonly used it is difficult to escape the conclusion that the meaning and the answer to the question, "Can machines think?" is to be sought in a statistical survey such as a Gallup poll. But this is absurd. Instead of attempting such a definition I shall replace the question by another, which is closely related to it and is expressed in relatively unambiguous words.

The new form of the problem can be described in terms of a game which we call the "imitation game." It is played with three people, a man (A), a woman (B), and an interrogator (C) who may be of either sex. The interrogator stays in a room apart from the other two. The object of the game for the interrogator is to determine which of the other two is the man and which is the woman. He knows them by labels X and Y, and at the end of the game he says either "X is A and Y is B" or "X is B and Y is A." The interrogator is allowed to put questions to A and B thus:

C: Will X please tell me the length of his or her hair?

Now suppose X is actually A, then A must answer. It is A's object in the game to try and cause C to make the wrong identification. His answer might therefore be:

"My hair is shingled, and the longest strands are about nine inches long."

In order that tones of voice may not help the interrogator the answers should be written, or better still, typewritten. The ideal arrangement is to have a teleprinter communicating between the two rooms. Alternatively the question and answers can be repeated by an intermediary. The object of the game for the third player (B) is to help the interrogator. The best strategy for her is probably to give truthful answers. She can add such things as "I am the woman, don't listen to him!" to her answers, but it will avail nothing as the man can make similar remarks.

We now ask the question, "What will happen when a machine takes the part of A in this game?" Will the interrogator decide wrongly as often when the game is played like this as he does when the game is played between a man and a woman? These questions replace our original, "Can machines think?"`,
    supplements: [{ type: "imitation-diagram" }],
    questions: [
      {
        id: "q1",
        prompt: "Why does Turing abandon the question \"Can machines think?\" in favor of the imitation game? What specific problem is he trying to avoid?",
        hint: "Think about what happens when you try to define \"think\" — where does that lead, and why does Turing consider it a dead end?"
      }
    ]
  },
  {
    id: "critique",
    title: "2. Critique of the New Problem",
    content: `As well as asking, "What is the answer to this new form of the question," one may ask, "Is this new question a worthy one to investigate?" This latter question we investigate without further ado, thereby cutting short an infinite regress.

The new problem has the advantage of drawing a fairly sharp line between the physical and the intellectual capacities of a man. No engineer or chemist claims to be able to produce a material which is indistinguishable from the human skin. It is possible that at some time this might be done, but even supposing this invention available we should feel there was little point in trying to make a "thinking machine" more human by dressing it up in such artificial flesh. The form in which we have set the problem reflects this fact in the condition which prevents the interrogator from seeing or touching the other competitors, or hearing their voices. Some other advantages of the proposed criterion may be shown up by specimen questions and answers. Thus:

Q: Please write me a sonnet on the subject of the Forth Bridge.
A: Count me out on this one. I never could write poetry.
Q: Add 34957 to 70764.
A: (Pause about 30 seconds and then give as answer) 105621.
Q: Do you play chess?
A: Yes.
Q: I have K at my K1, and no other pieces. You have only K at K6 and R at R1. It is your move. What do you play?
A: (After a pause of 15 seconds) R-R8 mate.

The question and answer method seems to be suitable for introducing almost any one of the fields of human endeavour that we wish to include. We do not wish to penalise the machine for its inability to shine in beauty competitions, nor to penalise a man for losing in a race against an aeroplane. The conditions of our game make these disabilities irrelevant. The "witnesses" can brag, if they consider it advisable, as much as they please about their charms, strength or heroism, but the interrogator cannot demand practical demonstrations.

The game may perhaps be criticised on the ground that the odds are weighted too heavily against the machine. If the man were to try and pretend to be the machine he would clearly make a very poor showing. He would be given away at once by slowness and inaccuracy in arithmetic. May not machines carry out something which ought to be described as thinking but which is very different from what a man does? This objection is a very strong one, but at least we can say that if, nevertheless, a machine can be constructed to play the imitation game satisfactorily, we need not be troubled by this objection.

It might be urged that when playing the "imitation game" the best strategy for the machine may possibly be something other than imitation of the behaviour of a man. This may be, but I think it is unlikely that there is any great effect of this kind. In any case there is no intention to investigate here the theory of the game, and it will be assumed that the best strategy is to try to provide answers that would naturally be given by a man.`,
    questions: [
      {
        id: "q2",
        prompt: "Turing concedes that the game may be \"weighted too heavily against the machine.\" What is the specific asymmetry he's acknowledging, and why does he think this concession doesn't undermine his test?",
        hint: "Consider: a machine might think in ways very different from a human. Why isn't that a fatal flaw for a test based on imitation?"
      }
    ]
  },
  {
    id: "machines",
    title: "3. The Machines Concerned in the Game",
    content: `The question which we put in §1 will not be quite definite until we have specified what we mean by the word "machine." It is natural that we should wish to permit every kind of engineering technique to be used in our machines. We also wish to allow the possibility that an engineer or team of engineers may construct a machine which works, but whose manner of operation cannot be satisfactorily described by its constructors because they have applied a method which is largely experimental. Finally, we wish to exclude from the machines men born in the usual manner. It is difficult to frame the definitions so as to satisfy these three conditions. One might for instance insist that the team of engineers should be all of one sex, but this would not really be satisfactory, for it is probably possible to rear a complete individual from a single cell of the skin (say) of a man. To do so would be a feat of biological technique deserving of the very highest praise, but we would not be inclined to regard it as a case of "constructing a thinking machine." This prompts us to abandon the requirement that every kind of technique should be permitted. We are the more ready to do so in view of the fact that the present interest in "thinking machines" has been aroused by a particular kind of machine, usually called an "electronic computer" or "digital computer." Following this suggestion we only permit digital computers to take part in our game.

This restriction appears at first sight to be a very drastic one. I shall attempt to show that it is not so in reality. To do this necessitates a short account of the nature and properties of these computers.

It may also be said that this identification of machines with digital computers, like our criterion for "thinking," will only be unsatisfactory if (contrary to my belief), it turns out that digital computers are unable to give a good showing in the game.

There are already a number of digital computers in working order, and it may be asked, "Why not try the experiment straight away? It would be easy to satisfy the conditions of the game. A number of interrogators could be used, and statistics compiled to show how often the right identification was given." The short answer is that we are not asking whether all digital computers would do well in the game nor whether the computers at present available would do well, but whether there are imaginable computers which would do well. But this is only the short answer. We shall see this question in a different light later.`,
    questions: []
  },
  {
    id: "digital",
    title: "4. Digital Computers",
    content: `The idea behind digital computers may be explained by saying that these machines are intended to carry out any operations which could be done by a human computer. The human computer is supposed to be following fixed rules; he has no authority to deviate from them in any detail. We may suppose that these rules are supplied in a book, which is altered whenever he is put on to a new job. He has also an unlimited supply of paper on which he does his calculations. He may also do his multiplications and additions on a "desk machine," but this is not important.

If we use the above explanation as a definition we shall be in danger of circularity of argument. We avoid this by giving an outline of the means by which the desired effect is achieved. A digital computer can usually be regarded as consisting of three parts:

(i) Store.
(ii) Executive unit.
(iii) Control.

The store is a store of information, and corresponds to the human computer's paper, whether this is the paper on which he does his calculations or that on which his book of rules is printed. In so far as the human computer does calculations in his head a part of the store will correspond to his memory.

The executive unit is the part which carries out the various individual operations involved in a calculation. What these individual operations are will vary from machine to machine. Usually fairly lengthy operations can be done such as "Multiply 3540675445 by 7076345687" but in some machines only very simple ones such as "Write down 0" are possible.

We have mentioned that the "book of rules" supplied to the computer is replaced in the machine by a part of the store. It is then called the "table of instructions." It is the duty of the control to see that these instructions are obeyed correctly and in the right order. The control is so constructed that this necessarily happens.

The information in the store is usually broken up into packets of moderately small size. In one machine, for instance, a packet might consist of ten decimal digits. Numbers are assigned to the parts of the store in which the various packets of information are stored, in some systematic manner. A typical instruction might say—

"Add the number stored in position 6809 to that in 4302 and put the result back into the latter storage position."

Needless to say it would not occur in the machine expressed in English. It would more likely be coded in a form such as 6809430217. Here 17 says which of various possible operations is to be performed on the two numbers. In this case the operation is that described above, viz., "Add the number. . . ." It will be noticed that the instruction takes up 10 digits and so forms one packet of information, very conveniently. The control will normally take the instructions to be obeyed in the order of the positions in which they are stored, but occasionally an instruction such as

"Now obey the instruction stored in position 5606, and continue from there"

may be encountered, or again

"If position 4505 contains 0 obey next the instruction stored in 6707, otherwise continue straight on."

Instructions of these latter types are very important because they make it possible for a sequence of operations to be replaced over and over again until some condition is fulfilled, but in doing so to obey, not fresh instructions on each repetition, but the same ones over and over again. To take a domestic analogy. Suppose Mother wants Tommy to call at the cobbler's every morning on his way to school to see if her shoes are done, she can ask him afresh every morning. Alternatively she can stick up a notice once and for all in the hall which he will see when he leaves for school and which tells him to call for the shoes, and also to destroy the notice when he comes back if he has the shoes with him.

The reader must accept it as a fact that digital computers can be constructed, and indeed have been constructed, according to the principles we have described, and that they can in fact mimic the actions of a human computer very closely.

The book of rules which we have described our human computer as using is of course a convenient fiction. Actual human computers really remember what they have got to do. If one wants to make a machine mimic the behaviour of the human computer in some complex operation one has to ask him how it is done, and then translate the answer into the form of an instruction table. Constructing instruction tables is usually described as "programming." To "programme a machine to carry out the operation A" means to put the appropriate instruction table into the machine so that it will do A.

An interesting variant on the idea of a digital computer is a "digital computer with a random element." These have instructions involving the throwing of a die or some equivalent electronic process; one such instruction might for instance be, "Throw the die and put the resulting number into store 1000." Sometimes such a machine is described as having free will (though I would not use this phrase myself). It is not normally possible to determine from observing a machine whether it has a random element, for a similar effect can be produced by such devices as making the choices depend on the digits of the decimal for π.

Most actual digital computers have only a finite store. There is no theoretical difficulty in the idea of a computer with an unlimited store. Of course only a finite part can have been used at any one time. Likewise only a finite amount can have been constructed, but we can imagine more and more being added as required. Such computers have special theoretical interest and will be called infinitive capacity computers.

The idea of a digital computer is an old one. Charles Babbage, Lucasian Professor of Mathematics at Cambridge from 1828 to 1839, planned such a machine, called the Analytical Engine, but it was never completed. Although Babbage had all the essential ideas, his machine was not at that time such a very attractive prospect. The speed which would have been available would be definitely faster than a human computer but something like 100 times slower than the Manchester machine, itself one of the slower of the modern machines. The storage was to be purely mechanical, using wheels and cards.

The fact that Babbage's Analytical Engine was to be entirely mechanical will help us to rid ourselves of a superstition. Importance is often attached to the fact that modern digital computers are electrical, and that the nervous system also is electrical. Since Babbage's machine was not electrical, and since all digital computers are in a sense equivalent, we see that this use of electricity cannot be of theoretical importance. Of course electricity usually comes in where fast signalling is concerned, so that it is not surprising that we find it in both these connections. In the nervous system chemical phenomena are at least as important as electrical. In certain computers the storage system is mainly acoustic. The feature of using electricity is thus seen to be only a very superficial similarity. If we wish to find such similarities we should look rather for mathematical analogies of function.`,
    supplements: [{ type: "computer-arch-diagram" }],
    questions: [
      {
        id: "q3",
        prompt: "Turing describes three components of a digital computer: store, executive unit, and control. Map these onto a modern computer's architecture. Then: why does Turing emphasize that Babbage's mechanical Analytical Engine is equivalent to electrical computers? What misconception is he preempting?",
        hint: "Think about what people in 1950 might have assumed about the relationship between electricity and thinking, given that brains are also electrical."
      }
    ]
  },
  {
    id: "universality",
    title: "5. Universality of Digital Computers",
    content: `The digital computers considered in the last section may be classified amongst the "discrete-state machines." These are the machines which move by sudden jumps or clicks from one quite definite state to another. These states are sufficiently different for the possibility of confusion between them to be ignored. Strictly speaking there are no such machines. Everything really moves continuously. But there are many kinds of machine which can profitably be thought of as being discrete-state machines.

It will seem that given the initial state of the machine and the input signals it is always possible to predict all future states. This is reminiscent of Laplace's view that from the complete state of the universe at one moment of time, as described by the positions and velocities of all particles, it should be possible to predict all future states. The prediction which we are considering is, however, rather nearer to practicability than that considered by Laplace. The system of the "universe as a whole" is such that quite small errors in the initial conditions can have an overwhelming effect at a later time. The displacement of a single electron by a billionth of a centimetre at one moment might make the difference between a man being killed by an avalanche a year later, or escaping. It is an essential property of the mechanical systems which we have called "discrete-state machines" that this phenomenon does not occur. Even when we consider the actual physical machines instead of the idealised machines, reasonably accurate knowledge of the state at one moment yields reasonably accurate knowledge any number of steps later.

As we have mentioned, digital computers fall within the class of discrete-state machines. But the number of states of which such a machine is capable is usually enormously large. For instance, the number for the machine now working at Manchester is about 2^165,000, i.e., about 10^50,000.

Given the table corresponding to a discrete-state machine it is possible to predict what it will do. There is no reason why this calculation should not be carried out by means of a digital computer. Provided it could be carried out sufficiently quickly the digital computer could mimic the behavior of any discrete-state machine. The imitation game could then be played with the machine in question (as B) and the mimicking digital computer (as A) and the interrogator would be unable to distinguish them. Of course the digital computer must have an adequate storage capacity as well as working sufficiently fast. Moreover, it must be programmed afresh for each new machine which it is desired to mimic.

This special property of digital computers, that they can mimic any discrete-state machine, is described by saying that they are universal machines. The existence of machines with this property has the important consequence that, considerations of speed apart, it is unnecessary to design various new machines to do various computing processes. They can all be done with one digital computer, suitably programmed for each case. It will be seen that as a consequence of this all digital computers are in a sense equivalent.

We may now consider again the point raised at the end of §3. It was suggested tentatively that the question, "Can machines think?" should be replaced by "Are there imaginable digital computers which would do well in the imitation game?" If we wish we can make this superficially more general and ask "Are there discrete-state machines which would do well?" But in view of the universality property we see that either of these questions is equivalent to this, "Let us fix our attention on one particular digital computer C. Is it true that by modifying this computer to have an adequate storage, suitably increasing its speed of action, and providing it with an appropriate programme, C can be made to play satisfactorily the part of A in the imitation game, the part of B being taken by a man?"`,
    supplements: [{ type: "universality-diagram" }],
    questions: [
      {
        id: "q4",
        prompt: "Universality is the linchpin of Turing's entire argument. In your own words: why does universality let him collapse the question from \"are there imaginable machines that could think?\" to a question about one specific computer with enough storage and the right program?",
        hint: "If every digital computer can simulate any other digital computer (given enough time and storage), what does that imply about whether the specific hardware matters?"
      }
    ]
  },
  {
    id: "objections",
    title: "6. Contrary Views on the Main Question",
    content: `We may now consider the ground to have been cleared and we are ready to proceed to the debate on our question, "Can machines think?" and the variant of it quoted at the end of the last section. We cannot altogether abandon the original form of the problem, for opinions will differ as to the appropriateness of the substitution and we must at least listen to what has to be said in this connexion.

It will simplify matters for the reader if I explain first my own beliefs in the matter. Consider first the more accurate form of the question. I believe that in about fifty years' time it will be possible to programme computers, with a storage capacity of about 10^9, to make them play the imitation game so well that an average interrogator will not have more than 70 per cent chance of making the right identification after five minutes of questioning. The original question, "Can machines think?" I believe to be too meaningless to deserve discussion. Nevertheless I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted. I believe further that no useful purpose is served by concealing these beliefs. The popular view that scientists proceed inexorably from well-established fact to well-established fact, never being influenced by any improved conjecture, is quite mistaken. Provided it is made clear which are proved facts and which are conjectures, no harm can result. Conjectures are of great importance since they suggest useful lines of research.

I now proceed to consider opinions opposed to my own.`,
    questions: []
  },
  {
    id: "obj-theological",
    title: "6.1 — The Theological Objection",
    content: `Thinking is a function of man's immortal soul. God has given an immortal soul to every man and woman, but not to any other animal or to machines. Hence no animal or machine can think.

I am unable to accept any part of this, but will attempt to reply in theological terms. I should find the argument more convincing if animals were classed with men, for there is a greater difference, to my mind, between the typical animate and the inanimate than there is between man and the other animals. The arbitrary character of the orthodox view becomes clearer if we consider how it might appear to a member of some other religious community. How do Christians regard the Moslem view that women have no souls? But let us leave this point aside and return to the main argument. It appears to me that the argument quoted above implies a serious restriction of the omnipotence of the Almighty. It is admitted that there are certain things that He cannot do such as making one equal to two, but should we not believe that He has freedom to confer a soul on an elephant if He sees fit? We might expect that He would only exercise this power in conjunction with a mutation which provided the elephant with an appropriately improved brain to minister to the needs of this soul. An argument of exactly similar form may be made for the case of machines. It may seem different because it is more difficult to "swallow." But this really only means that we think it would be less likely that He would consider the circumstances suitable for conferring a soul. The circumstances in question are discussed in the rest of this paper. In attempting to construct such machines we should not be irreverently usurping His power of creating souls, any more than we are in the procreation of children: rather we are, in either case, instruments of His will providing mansions for the souls that He creates.

However, this is mere speculation. I am not very impressed with theological arguments whatever they may be used to support. Such arguments have often been found unsatisfactory in the past. In the time of Galileo it was argued that the texts, "And the sun stood still . . . and hasted not to go down about a whole day" (Joshua x. 13) and "He laid the foundations of the earth, that it should not move at any time" (Psalm cv. 5) were an adequate refutation of the Copernican theory. With our present knowledge such an argument appears futile. When that knowledge was not available it made a quite different impression.`,
    questions: []
  },
  {
    id: "obj-heads",
    title: "6.2 — The \"Heads in the Sand\" Objection",
    content: `"The consequences of machines thinking would be too dreadful. Let us hope and believe that they cannot do so."

This argument is seldom expressed quite so openly as in the form above. But it affects most of us who think about it at all. We like to believe that Man is in some subtle way superior to the rest of creation. It is best if he can be shown to be necessarily superior, for then there is no danger of him losing his commanding position. The popularity of the theological argument is clearly connected with this feeling. It is likely to be quite strong in intellectual people, since they value the power of thinking more highly than others, and are more inclined to base their belief in the superiority of Man on this power.

I do not think that this argument is sufficiently substantial to require refutation. Consolation would be more appropriate: perhaps this should be sought in the transmigration of souls.`,
    questions: []
  },
  {
    id: "obj-math",
    title: "6.3 — The Mathematical Objection",
    content: `There are a number of results of mathematical logic which can be used to show that there are limitations to the powers of discrete-state machines. The best known of these results is known as Gödel's theorem (1931) and shows that in any sufficiently powerful logical system statements can be formulated which can neither be proved nor disproved within the system, unless possibly the system itself is inconsistent. There are other, in some respects similar, results due to Church (1936), Kleene (1935), Rosser, and Turing (1937). The latter result is the most convenient to consider, since it refers directly to machines, whereas the others can only be used in a comparatively indirect argument: for instance if Gödel's theorem is to be used we need in addition to have some means of describing logical systems in terms of machines, and machines in terms of logical systems. The result in question refers to a type of machine which is essentially a digital computer with an infinite capacity. It states that there are certain things that such a machine cannot do. If it is rigged up to give answers to questions as in the imitation game, there will be some questions to which it will either give a wrong answer, or fail to give an answer at all however much time is allowed for a reply. There may, of course, be many such questions, and questions which cannot be answered by one machine may be satisfactorily answered by another.

The short answer to this argument is that although it is established that there are limitations to the powers of any particular machine, it has only been stated, without any sort of proof, that no such limitations apply to the human intellect. But I do not think this view can be dismissed quite so lightly. Whenever one of these machines is asked the appropriate critical question, and gives a definite answer, we know that this answer must be wrong, and this gives us a certain feeling of superiority. Is this feeling illusory? It is no doubt quite genuine, but I do not think too much importance should be attached to it. We too often give wrong answers to questions ourselves to be justified in being very pleased at such evidence of fallibility on the part of the machines. Further, our superiority can only be felt on such an occasion in relation to the one machine over which we have scored our petty triumph. There would be no question of triumphing simultaneously over all machines. In short, then, there might be men cleverer than any given machine, but then again there might be other machines cleverer again, and so on.`,
    questions: [
      {
        id: "q5",
        prompt: "Turing's rebuttal to the Gödel argument has two layers. What are they? Which one do you find more compelling, and why?",
        hint: "Layer 1 is about what Gödel's theorem actually proves vs. what's assumed. Layer 2 is about what follows even if you grant the objection."
      }
    ]
  },
  {
    id: "obj-consciousness",
    title: "6.4 — The Argument from Consciousness",
    content: `This argument is very well expressed in Professor Jefferson's Lister Oration for 1949, from which I quote. "Not until a machine can write a sonnet or compose a concerto because of thoughts and emotions felt, and not by the chance fall of symbols, could we agree that machine equals brain—that is, not only write it but know that it had written it. No mechanism could feel (and not merely artificially signal, an easy contrivance) pleasure at its successes, grief when its valves fuse, be warmed by flattery, be made miserable by its mistakes, be charmed by sex, be angry or depressed when it cannot get what it wants."

This argument appears to be a denial of the validity of our test. According to the most extreme form of this view the only way by which one could be sure that machine thinks is to be the machine and to feel oneself thinking. One could then describe these feelings to the world, but of course no one would be justified in taking any notice. Likewise according to this view the only way to know that a man thinks is to be that particular man. It is in fact the solipsist point of view. It may be the most logical view to hold but it makes communication of ideas difficult. A is liable to believe "A thinks but B does not" whilst B believes "B thinks but A does not." Instead of arguing continually over this point it is usual to have the polite convention that everyone thinks.

I am sure that Professor Jefferson does not wish to adopt the extreme and solipsist point of view. Probably he would be quite willing to accept the imitation game as a test. The game (with the player B omitted) is frequently used in practice under the name of viva voce to discover whether someone really understands something or has "learnt it parrot fashion." Let us listen in to a part of such a viva voce:

Interrogator: In the first line of your sonnet which reads "Shall I compare thee to a summer's day," would not "a spring day" do as well or better?
Witness: It wouldn't scan.
Interrogator: How about "a winter's day." That would scan all right.
Witness: Yes, but nobody wants to be compared to a winter's day.
Interrogator: Would you say Mr. Pickwick reminded you of Christmas?
Witness: In a way.
Interrogator: Yet Christmas is a winter's day, and I do not think Mr. Pickwick would mind the comparison.
Witness: I don't think you're serious. By a winter's day one means a typical winter's day, rather than a special one like Christmas.

And so on. What would Professor Jefferson say if the sonnet-writing machine was able to answer like this in the viva voce? I do not know whether he would regard the machine as "merely artificially signalling" these answers, but if the answers were as satisfactory and sustained as in the above passage I do not think he would describe it as "an easy contrivance."

In short then, I think that most of those who support the argument from consciousness could be persuaded to abandon it rather than be forced into the solipsist position. They will then probably be willing to accept our test.

I do not wish to give the impression that I think there is no mystery about consciousness. There is, for instance, something of a paradox connected with any attempt to localise it. But I do not think these mysteries necessarily need to be solved before we can answer the question with which we are concerned in this paper.`,
    questions: [
      {
        id: "q6",
        prompt: "Turing argues that the consciousness objection, taken seriously, collapses into solipsism. Walk through his logic: why is that the case? And then — do you think he's right that this is a reductio ad absurdum, or is there a version of the consciousness argument that escapes solipsism?",
        hint: "If you require subjective experience as proof of thinking, how do you verify subjective experience in anyone other than yourself?"
      }
    ]
  },
  {
    id: "obj-disabilities",
    title: "6.5 — Arguments from Various Disabilities",
    content: `These arguments take the form, "I grant you that you can make machines do all the things you have mentioned but you will never be able to make one to do X." Numerous features X are suggested in this connexion. I offer a selection:

Be kind, resourceful, beautiful, friendly, have initiative, have a sense of humour, tell right from wrong, make mistakes, fall in love, enjoy strawberries and cream, make someone fall in love with it, learn from experience, use words properly, be the subject of its own thought, have as much diversity of behaviour as a man, do something really new.

No support is usually offered for these statements. I believe they are mostly founded on the principle of scientific induction. A man has seen thousands of machines in his lifetime. From what he sees of them he draws a number of general conclusions. They are ugly, each is designed for a very limited purpose, when required for a minutely different purpose they are useless, the variety of behaviour of any one of them is very small, etc., etc. Naturally he concludes that these are necessary properties of machines in general. Many of these limitations are associated with the very small storage capacity of most machines.

The claim that "machines cannot make mistakes" seems a curious one. One is tempted to retort, "Are they any the worse for that?" But let us adopt a more sympathetic attitude, and try to see what is really meant. I think this criticism can be explained in terms of the imitation game. It is claimed that the interrogator could distinguish the machine from the man simply by setting them a number of problems in arithmetic. The machine would be unmasked because of its deadly accuracy. The reply to this is simple. The machine (programmed for playing the game) would not attempt to give the right answers to the arithmetic problems. It would deliberately introduce mistakes in a manner calculated to confuse the interrogator.

It seems to me that this criticism depends on a confusion between two kinds of mistake. We may call them "errors of functioning" and "errors of conclusion." Errors of functioning are due to some mechanical or electrical fault which causes the machine to behave otherwise than it was designed to do. In philosophical discussions one likes to ignore the possibility of such errors; one is therefore discussing "abstract machines." These abstract machines are mathematical fictions rather than physical objects. By definition they are incapable of errors of functioning. In this sense we can truly say that "machines can never make mistakes." Errors of conclusion can only arise when some meaning is attached to the output signals from the machine. The machine might, for instance, type out mathematical equations, or sentences in English. When a false proposition is typed we say that the machine has committed an error of conclusion. There is clearly no reason at all for saying that a machine cannot make this kind of mistake.

The claim that a machine cannot be the subject of its own thought can of course only be answered if it can be shown that the machine has some thought with some subject matter. Nevertheless, "the subject matter of a machine's operations" does seem to mean something, at least to the people who deal with it. If, for instance, the machine was trying to find a solution of the equation x² − 40x − 11 = 0 one would be tempted to describe this equation as part of the machine's subject matter at that moment. In this sort of sense a machine undoubtedly can be its own subject matter. It may be used to help in making up its own programmes, or to predict the effect of alterations in its own structure. By observing the results of its own behaviour it can modify its own programmes so as to achieve some purpose more effectively. These are possibilities of the near future, rather than Utopian dreams.

The criticisms that we are considering here are often disguised forms of the argument from consciousness. Usually if one maintains that a machine can do one of these things, and describes the kind of method that the machine could use, one will not make much of an impression. It is thought that the method (whatever it may be, for it must be mechanical) is really rather base.`,
    questions: [
      {
        id: "q7",
        prompt: "Turing says these disability arguments are \"mostly founded on the principle of scientific induction\" from observing limited machines. Now consider: are modern LLMs vulnerable to a similar error in the opposite direction — where people observe impressive outputs and inductively conclude the machine \"understands\"?",
        hint: "Turing identifies a reasoning pattern: observing limited machines → concluding all machines must be limited. What's the mirror image of that error?"
      }
    ]
  },
  {
    id: "obj-lovelace",
    title: "6.6 — Lady Lovelace's Objection",
    content: `Our most detailed information of Babbage's Analytical Engine comes from a memoir by Lady Lovelace (1842). In it she states, "The Analytical Engine has no pretensions to originate anything. It can do whatever we know how to order it to perform" (her italics). This statement is quoted by Hartree (1949) who adds: "This does not imply that it may not be possible to construct electronic equipment which will 'think for itself,' or in which, in biological terms, one could set up a conditioned reflex, which would serve as a basis for 'learning.' Whether this is possible in principle or not is a stimulating and exciting question, suggested by some of these recent developments. But it did not seem that the machines constructed or projected at the time had this property."

I am in thorough agreement with Hartree over this. It will be noticed that he does not assert that the machines in question had not got the property, but rather that the evidence available to Lady Lovelace did not encourage her to believe that they had it. It is quite possible that the machines in question had in a sense got this property. For suppose that some discrete-state machine has the property. The Analytical Engine was a universal digital computer, so that, if its storage capacity and speed were adequate, it could by suitable programming be made to mimic the machine in question. Probably this argument did not occur to the Countess or to Babbage. In any case there was no obligation on them to claim all that could be claimed.

A variant of Lady Lovelace's objection states that a machine can "never do anything really new." This may be parried for a moment with the saw, "There is nothing new under the sun." Who can be certain that "original work" that he has done was not simply the growth of the seed planted in him by teaching, or the effect of following well-known general principles. A better variant of the objection says that a machine can never "take us by surprise." This statement is a more direct challenge and can be met directly. Machines take me by surprise with great frequency. This is largely because I do not do sufficient calculation to decide what to expect them to do, or rather because, although I do a calculation, I do it in a hurried, slipshod fashion, taking risks.

I do not expect this reply to silence my critic. He will probably say that such surprises are due to some creative mental act on my part, and reflect no credit on the machine. This leads us back to the argument from consciousness, and far from the idea of surprise. It is a line of argument we must consider closed, but it is perhaps worth remarking that the appreciation of something as surprising requires as much of a "creative mental act" whether the surprising event originates from a man, a book, a machine or anything else.

The view that machines cannot give rise to surprises is due, I believe, to a fallacy to which philosophers and mathematicians are particularly subject. This is the assumption that as soon as a fact is presented to a mind all consequences of that fact spring into the mind simultaneously with it. It is a very useful assumption under many circumstances, but one too easily forgets that it is false. A natural consequence of doing so is that one then assumes that there is no virtue in the mere working out of consequences from data and general principles.`,
    questions: [
      {
        id: "q8",
        prompt: "Lady Lovelace's objection — that machines can only do what we \"know how to order\" them to do — is still one of the most common arguments against AI creativity. Turing gives two counterarguments. What are they? And which one do you think holds up better given what we know about modern neural networks?",
        hint: "One counterargument is about universality. The other is about surprise. Think about whether a trained neural network does things its creators \"ordered\" it to do."
      }
    ]
  },
  {
    id: "obj-continuity",
    title: "6.7–6.9 — Continuity, Informality, and ESP",
    content: `(7) Argument from Continuity in the Nervous System

The nervous system is certainly not a discrete-state machine. A small error in the information about the size of a nervous impulse impinging on a neuron, may make a large difference to the size of the outgoing impulse. It may be argued that, this being so, one cannot expect to be able to mimic the behaviour of the nervous system with a discrete-state system.

It is true that a discrete-state machine must be different from a continuous machine. But if we adhere to the conditions of the imitation game, the interrogator will not be able to take any advantage of this difference. The situation can be made clearer if we consider some other simpler continuous machine. A differential analyser will do very well. Some of these provide their answers in a typed form, and so are suitable for taking part in the game. It would not be possible for a digital computer to predict exactly what answers the differential analyser would give to a problem, but it would be quite capable of giving the right sort of answer.

(8) The Argument from Informality of Behaviour

It is not possible to produce a set of rules purporting to describe what a man should do in every conceivable set of circumstances. One might for instance have a rule that one is to stop when one sees a red traffic light, and to go if one sees a green one, but what if by some fault both appear together? One may perhaps decide that it is safest to stop. But some further difficulty may well arise from this decision later. To attempt to provide rules of conduct to cover every eventuality, even those arising from traffic lights, appears to be impossible. With all this I agree.

From this it is argued that we cannot be machines. I shall try to reproduce the argument, but I fear I shall hardly do it justice. It seems to run something like this. "If each man had a definite set of rules of conduct by which he regulated his life he would be no better than a machine. But there are no such rules, so men cannot be machines." The undistributed middle is glaring. I do not think the argument is ever put quite like this, but I believe this is the argument used nevertheless. There may however be a certain confusion between "rules of conduct" and "laws of behaviour" to cloud the issue. By "rules of conduct" I mean precepts such as "Stop if you see red lights," on which one can act, and of which one can be conscious. By "laws of behaviour" I mean laws of nature as applied to a man's body such as "if you pinch him he will squeak."

We can demonstrate more forcibly that any such statement would be unjustified. For suppose we could be sure of finding such laws if they existed. Then given a discrete-state machine it should certainly be possible to discover by observation sufficient about it to predict its future behaviour, and this within a reasonable time, say a thousand years. But this does not seem to be the case. I have set up on the Manchester computer a small programme using only 1,000 units of storage, whereby the machine supplied with one sixteen-figure number replies with another within two seconds. I would defy anyone to learn from these replies sufficient about the programme to be able to predict any replies to untried values.

(9) The Argument from Extrasensory Perception

I assume that the reader is familiar with the idea of extrasensory perception, and the meaning of the four items of it, viz., telepathy, clairvoyance, precognition and psychokinesis. These disturbing phenomena seem to deny all our usual scientific ideas. How we should like to discredit them! Unfortunately the statistical evidence, at least for telepathy, is overwhelming.

This argument is to my mind quite a strong one. One can say in reply that many scientific theories seem to remain workable in practice, in spite of clashing with ESP; that in fact one can get along very nicely if one forgets about it. This is rather cold comfort, and one fears that thinking is just the kind of phenomenon where ESP may be especially relevant.

If telepathy is admitted it will be necessary to tighten our test up. The situation could be regarded as analogous to that which would occur if the interrogator were talking to himself and one of the competitors was listening with his ear to the wall. To put the competitors into a "telepathy-proof room" would satisfy all requirements.`,
    questions: [
      {
        id: "q9",
        prompt: "Turing's distinction between \"rules of conduct\" and \"laws of behaviour\" in the informality argument is subtle but important. Explain the distinction. Then: does a neural network operate according to \"rules of conduct\" or \"laws of behaviour\" — or is that a false dichotomy?",
        hint: "Rules of conduct are consciously followed prescriptions. Laws of behaviour are natural regularities that govern a system whether it's aware of them or not. Where do learned weights fit?"
      }
    ]
  },
  {
    id: "learning",
    title: "7. Learning Machines",
    content: `The reader will have anticipated that I have no very convincing arguments of a positive nature to support my views. If I had I should not have taken such pains to point out the fallacies in contrary views. Such evidence as I have I shall now give.

Let us return for a moment to Lady Lovelace's objection, which stated that the machine can only do what we tell it to do. One could say that a man can "inject" an idea into the machine, and that it will respond to a certain extent and then drop into quiescence, like a piano string struck by a hammer. Another simile would be an atomic pile of less than critical size: an injected idea is to correspond to a neutron entering the pile from without. Each such neutron will cause a certain disturbance which eventually dies away. If, however, the size of the pile is sufficiently increased, the disturbance caused by such an incoming neutron will very likely go on and on increasing until the whole pile is destroyed. Is there a corresponding phenomenon for minds, and is there one for machines? There does seem to be one for the human mind. The majority of them seem to be "subcritical," i.e., to correspond in this analogy to piles of subcritical size. An idea presented to such a mind will on average give rise to less than one idea in reply. A smallish proportion are supercritical. An idea presented to such a mind may give rise to a whole "theory" consisting of secondary, tertiary and more remote ideas. Animals' minds seem to be very definitely subcritical. Adhering to this analogy we ask, "Can a machine be made to be supercritical?"

The "skin-of-an-onion" analogy is also helpful. In considering the functions of the mind or the brain we find certain operations which we can explain in purely mechanical terms. This we say does not correspond to the real mind: it is a sort of skin which we must strip off if we are to find the real mind. But then in what remains we find a further skin to be stripped off, and so on. Proceeding in this way do we ever come to the "real" mind, or do we eventually come to the skin which has nothing in it? In the latter case the whole mind is mechanical. (It would not be a discrete-state machine however. We have discussed this.)

These last two paragraphs do not claim to be convincing arguments. They should rather be described as "recitations tending to produce belief."

The only really satisfactory support that can be given for the view expressed at the beginning of §6, will be that provided by waiting for the end of the century and then doing the experiment described. But what can we say in the meantime? What steps should be taken now if the experiment is to be successful?

As I have explained, the problem is mainly one of programming. Advances in engineering will have to be made too, but it seems unlikely that these will not be adequate for the requirements. Estimates of the storage capacity of the brain vary from 10^10 to 10^15 binary digits. I incline to the lower values and believe that only a very small fraction is used for the higher types of thinking. Most of it is probably used for the retention of visual impressions. I should be surprised if more than 10^9 was required for satisfactory playing of the imitation game, at any rate against a blind man. (Note: The capacity of the Encyclopaedia Britannica, 11th edition, is 2 × 10^9.) A storage capacity of 10^7 would be a very practicable possibility even by present techniques. It is probably not necessary to increase the speed of operations of the machines at all. Parts of modern machines which can be regarded as analogs of nerve cells work about a thousand times faster than the latter. This should provide a "margin of safety" which could cover losses of speed arising in many ways. Our problem then is to find out how to programme these machines to play the game. At my present rate of working I produce about a thousand digits of programme a day, so that about sixty workers, working steadily through the fifty years might accomplish the job, if nothing went into the wastepaper basket. Some more expeditious method seems desirable.

In the process of trying to imitate an adult human mind we are bound to think a good deal about the process which has brought it to the state that it is in. We may notice three components.

(a) The initial state of the mind, say at birth,
(b) The education to which it has been subjected,
(c) Other experience, not to be described as education, to which it has been subjected.

Instead of trying to produce a programme to simulate the adult mind, why not rather try to produce one which simulates the child's? If this were then subjected to an appropriate course of education one would obtain the adult brain. Presumably the child brain is something like a notebook as one buys it from the stationer's. Rather little mechanism, and lots of blank sheets. (Mechanism and writing are from our point of view almost synonymous.) Our hope is that there is so little mechanism in the child brain that something like it can be easily programmed. The amount of work in the education we can assume, as a first approximation, to be much the same as for the human child.

We have thus divided our problem into two parts. The child programme and the education process. These two remain very closely connected. We cannot expect to find a good child machine at the first attempt. One must experiment with teaching one such machine and see how well it learns. One can then try another and see if it is better or worse. There is an obvious connection between this process and evolution, by the identifications:

Structure of the child machine = hereditary material
Changes of the child machine = mutation
Natural selection = judgment of the experimenter

One may hope, however, that this process will be more expeditious than evolution. The survival of the fittest is a slow method for measuring advantages. The experimenter, by the exercise of intelligence, should be able to speed it up. Equally important is the fact that he is not restricted to random mutations. If he can trace a cause for some weakness he can probably think of the kind of mutation which will improve it.

We normally associate punishments and rewards with the teaching process. Some simple child machines can be constructed or programmed on this sort of principle. The machine has to be so constructed that events which shortly preceded the occurrence of a punishment signal are unlikely to be repeated, whereas a reward signal increased the probability of repetition of the events which led up to it. These definitions do not presuppose any feelings on the part of the machine. I have done some experiments with one such child machine, and succeeded in teaching it a few things, but the teaching method was too unorthodox for the experiment to be considered really successful.

The use of punishments and rewards can at best be a part of the teaching process. Roughly speaking, if the teacher has no other means of communicating to the pupil, the amount of information which can reach him does not exceed the total number of rewards and punishments applied. By the time a child has learnt to repeat "Casabianca" he would probably feel very sore indeed, if the text could only be discovered by a "Twenty Questions" technique, every "NO" taking the form of a blow. It is necessary therefore to have some other "unemotional" channels of communication. If these are available it is possible to teach a machine by punishments and rewards to obey orders given in some language, e.g., a symbolic language. These orders are to be transmitted through the "unemotional" channels. The use of this language will diminish greatly the number of punishments and rewards required.

Opinions may vary as to the complexity which is suitable in the child machine. One might try to make it as simple as possible consistently with the general principles. Alternatively one might have a complete system of logical inference "built in." In the latter case the store would be largely occupied with definitions and propositions. The propositions would have various kinds of status, e.g., well-established facts, conjectures, mathematically proved theorems, statements given by an authority, expressions having the logical form of proposition but not belief-value. Certain propositions may be described as "imperatives." The machine should be so constructed that as soon as an imperative is classed as "well established" the appropriate action automatically takes place.

The idea of a learning machine may appear paradoxical to some readers. How can the rules of operation of the machine change? They should describe completely how the machine will react whatever its history might be, whatever changes it might undergo. The rules are thus quite time-invariant. This is quite true. The explanation of the paradox is that the rules which get changed in the learning process are of a rather less pretentious kind, claiming only an ephemeral validity. The reader may draw a parallel with the Constitution of the United States.

An important feature of a learning machine is that its teacher will often be very largely ignorant of quite what is going on inside, although he may still be able to some extent to predict his pupil's behavior. This should apply most strongly to the later education of a machine arising from a child machine of well-tried design (or programme). This is in clear contrast with normal procedure when using a machine to do computations: one's object is then to have a clear mental picture of the state of the machine at each moment in the computation. This object can only be achieved with a struggle. The view that "the machine can only do what we know how to order it to do" appears strange in face of this. Most of the programmes which we can put into the machine will result in its doing something that we cannot make sense of at all, or which we regard as completely random behaviour. Intelligent behaviour presumably consists in a departure from the completely disciplined behaviour involved in computation, but a rather slight one, which does not give rise to random behaviour, or to pointless repetitive loops.

It is probably wise to include a random element in a learning machine. A random element is rather useful when we are searching for a solution of some problem.

We may hope that machines will eventually compete with men in all purely intellectual fields. But which are the best ones to start with? Even this is a difficult decision. Many people think that a very abstract activity, like the playing of chess, would be best. It can also be maintained that it is best to provide the machine with the best sense organs that money can buy, and then teach it to understand and speak English. This process could follow the normal teaching of a child. Things would be pointed out and named, etc. Again I do not know what the right answer is, but I think both approaches should be tried.

We can only see a short distance ahead, but we can see plenty there that needs to be done.`,
    questions: [
      {
        id: "q10",
        prompt: "Turing's \"subcritical vs supercritical\" analogy for minds is striking. An idea enters a subcritical mind and fizzles; it enters a supercritical mind and generates a chain reaction of further ideas. Do you think current LLMs are subcritical or supercritical by this definition? Defend your answer with a specific example.",
        hint: "Think carefully about whether an LLM generates genuinely new ideas from a prompt, or whether it's doing something that looks like chain reaction but might be something else."
      },
      {
        id: "q11",
        prompt: "This is the big synthesis question. Turing proposes building a \"child machine\" and educating it, rather than programming an adult mind directly. Modern deep learning does something eerily similar (architecture + training data = learned behavior). But Turing also says the teacher will be \"very largely ignorant of quite what is going on inside.\" Is this a feature or a bug? What are the implications for trust and verification — something you think about in the context of verifiable compute?",
        hint: "Connect this to your own domain: if the system's internal reasoning is opaque, how do you verify its outputs? Turing treats opacity as natural. Should we?"
      }
    ]
  }
];

const COLORS = {
  bg: "#0a0e14",
  surface: "#111722",
  surfaceHover: "#1a2233",
  border: "#1e2a3a",
  borderActive: "#3d8bfd",
  text: "#c8d3e0",
  textDim: "#6b7d94",
  textBright: "#e8edf3",
  accent: "#3d8bfd",
  accentDim: "#2a6bc4",
  yellow: "#f0c060",
  yellowDim: "#7a6230",
  teal: "#40c8b0",
  purple: "#a480cf",
  purpleDim: "#5a4070",
};

function DiagramFrame({ title, caption, children }) {
  return (
    <div className="tr-diagram-frame" style={{
      border: `1px solid ${COLORS.border}`,
      background: COLORS.surface,
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: COLORS.accent,
        marginBottom: "16px",
      }}>
        ◇ Diagram. {title}
      </div>
      <div style={{ width: "100%", overflow: "auto" }}>
        {children}
      </div>
      {caption && (
        <div style={{
          marginTop: "12px",
          paddingTop: "12px",
          borderTop: `1px solid ${COLORS.border}`,
          fontSize: "12px",
          color: COLORS.textDim,
          lineHeight: "1.5",
          fontStyle: "italic",
        }}>
          {caption}
        </div>
      )}
    </div>
  );
}

function ImitationGameDiagram() {
  const c = COLORS;
  return (
    <DiagramFrame
      title="The Imitation Game setup"
      caption="Turing's replacement move: put a machine in the role of A. If C misidentifies as often as before, the machine is playing the game satisfactorily."
    >
      <svg viewBox="0 0 680 300" style={{ width: "100%", height: "auto", display: "block" }}>
        <rect x="20" y="50" width="200" height="200" fill="none" stroke={c.border} strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="120" y="40" fill={c.textDim} fontSize="10" textAnchor="middle" fontFamily="monospace" letterSpacing="2">ROOM 1</text>

        <circle cx="120" cy="140" r="32" fill="none" stroke={c.accent} strokeWidth="2" />
        <text x="120" y="147" fill={c.accent} fontSize="22" textAnchor="middle" fontFamily="serif">C</text>
        <text x="120" y="198" fill={c.textBright} fontSize="12" textAnchor="middle">Interrogator</text>
        <text x="120" y="215" fill={c.textDim} fontSize="10" textAnchor="middle">sees only labels</text>
        <text x="120" y="228" fill={c.textDim} fontSize="10" textAnchor="middle">X and Y</text>

        <rect x="295" y="100" width="90" height="100" fill={c.bg} stroke={c.yellow} strokeWidth="1.2" />
        <text x="340" y="140" fill={c.yellow} fontSize="10" textAnchor="middle" fontFamily="monospace">TELE-</text>
        <text x="340" y="155" fill={c.yellow} fontSize="10" textAnchor="middle" fontFamily="monospace">PRINTER</text>
        <text x="340" y="175" fill={c.textDim} fontSize="9" textAnchor="middle" fontFamily="monospace">(typed only)</text>

        <line x1="220" y1="125" x2="293" y2="125" stroke={c.textDim} strokeWidth="1" />
        <polygon points="293,125 287,122 287,128" fill={c.textDim} />
        <text x="256" y="118" fill={c.textDim} fontSize="10" textAnchor="middle">question →</text>

        <line x1="387" y1="175" x2="460" y2="175" stroke={c.textDim} strokeWidth="1" />
        <line x1="220" y1="175" x2="293" y2="175" stroke={c.textDim} strokeWidth="1" />
        <polygon points="220,175 226,172 226,178" fill={c.textDim} />
        <text x="340" y="215" fill={c.textDim} fontSize="10" textAnchor="middle">← answer (typed)</text>

        <rect x="460" y="50" width="200" height="200" fill="none" stroke={c.border} strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="560" y="40" fill={c.textDim} fontSize="10" textAnchor="middle" fontFamily="monospace" letterSpacing="2">ROOM 2</text>

        <circle cx="520" cy="130" r="26" fill="none" stroke={c.purple} strokeWidth="2" />
        <text x="520" y="137" fill={c.purple} fontSize="18" textAnchor="middle" fontFamily="serif">X</text>
        <text x="520" y="175" fill={c.textBright} fontSize="11" textAnchor="middle">= A (man)</text>
        <text x="520" y="192" fill={c.textDim} fontSize="10" textAnchor="middle">tries to</text>
        <text x="520" y="205" fill={c.textDim} fontSize="10" textAnchor="middle">deceive C</text>

        <circle cx="600" cy="130" r="26" fill="none" stroke={c.teal} strokeWidth="2" />
        <text x="600" y="137" fill={c.teal} fontSize="18" textAnchor="middle" fontFamily="serif">Y</text>
        <text x="600" y="175" fill={c.textBright} fontSize="11" textAnchor="middle">= B (woman)</text>
        <text x="600" y="192" fill={c.textDim} fontSize="10" textAnchor="middle">answers</text>
        <text x="600" y="205" fill={c.textDim} fontSize="10" textAnchor="middle">honestly</text>

        <text x="520" y="270" fill={c.yellow} fontSize="11" textAnchor="middle" fontFamily="monospace">
          ↑ replace with machine?
        </text>
      </svg>
    </DiagramFrame>
  );
}

function ComputerArchDiagram() {
  const c = COLORS;
  return (
    <DiagramFrame
      title="Turing's 3-part digital computer"
      caption="This is the von Neumann architecture as it existed in Turing's mind in 1950. Map it to modern equivalents and it's nearly identical. The abstraction has held up."
    >
      <svg viewBox="0 0 680 340" style={{ width: "100%", height: "auto", display: "block" }}>
        <rect x="40" y="60" width="240" height="220" fill="none" stroke={c.accent} strokeWidth="1.5" />
        <text x="160" y="85" fill={c.accent} fontSize="13" textAnchor="middle" fontFamily="monospace" letterSpacing="1.5">STORE</text>
        <line x1="60" y1="100" x2="260" y2="100" stroke={c.border} strokeWidth="1" />
        <text x="160" y="130" fill={c.textBright} fontSize="12" textAnchor="middle">data</text>
        <text x="160" y="148" fill={c.textDim} fontSize="10" textAnchor="middle" fontStyle="italic">(paper / scratch)</text>
        <line x1="80" y1="170" x2="240" y2="170" stroke={c.border} strokeWidth="1" strokeDasharray="2 3" />
        <text x="160" y="195" fill={c.textBright} fontSize="12" textAnchor="middle">table of instructions</text>
        <text x="160" y="213" fill={c.textDim} fontSize="10" textAnchor="middle" fontStyle="italic">(book of rules)</text>
        <text x="160" y="255" fill={c.yellow} fontSize="10" textAnchor="middle" fontFamily="monospace">≈ RAM</text>

        <rect x="420" y="60" width="220" height="100" fill="none" stroke={c.teal} strokeWidth="1.5" />
        <text x="530" y="85" fill={c.teal} fontSize="13" textAnchor="middle" fontFamily="monospace" letterSpacing="1.5">EXECUTIVE UNIT</text>
        <line x1="440" y1="100" x2="620" y2="100" stroke={c.border} strokeWidth="1" />
        <text x="530" y="125" fill={c.textBright} fontSize="12" textAnchor="middle">performs operations</text>
        <text x="530" y="143" fill={c.textDim} fontSize="10" textAnchor="middle">add, multiply, write</text>
        <text x="530" y="180" fill={c.yellow} fontSize="10" textAnchor="middle" fontFamily="monospace">≈ ALU</text>

        <rect x="420" y="210" width="220" height="100" fill="none" stroke={c.purple} strokeWidth="1.5" />
        <text x="530" y="235" fill={c.purple} fontSize="13" textAnchor="middle" fontFamily="monospace" letterSpacing="1.5">CONTROL</text>
        <line x1="440" y1="250" x2="620" y2="250" stroke={c.border} strokeWidth="1" />
        <text x="530" y="275" fill={c.textBright} fontSize="12" textAnchor="middle">reads instructions</text>
        <text x="530" y="293" fill={c.textDim} fontSize="10" textAnchor="middle">in correct sequence</text>
        <text x="530" y="328" fill={c.yellow} fontSize="10" textAnchor="middle" fontFamily="monospace">≈ Control Unit</text>

        <line x1="418" y1="260" x2="285" y2="200" stroke={c.textDim} strokeWidth="1" />
        <polygon points="285,200 291,198 288,204" fill={c.textDim} />
        <text x="350" y="245" fill={c.textDim} fontSize="10" textAnchor="middle">fetch instruction</text>

        <line x1="530" y1="208" x2="530" y2="165" stroke={c.textDim} strokeWidth="1" />
        <polygon points="530,165 527,171 533,171" fill={c.textDim} />
        <text x="580" y="188" fill={c.textDim} fontSize="10">dispatch</text>

        <line x1="418" y1="110" x2="285" y2="135" stroke={c.textDim} strokeWidth="1" />
        <polygon points="285,135 291,131 292,137" fill={c.textDim} />
        <text x="350" y="105" fill={c.textDim} fontSize="10" textAnchor="middle">read / write data</text>
      </svg>
    </DiagramFrame>
  );
}

function UniversalityDiagram() {
  const c = COLORS;
  return (
    <DiagramFrame
      title="The universality collapse"
      caption="Each step narrows the question without losing meaning. The last form is concrete enough to answer by engineering."
    >
      <svg viewBox="0 0 680 400" className="tr-diagram-svg" preserveAspectRatio="xMidYMid meet">
        <rect x="20" y="30" width="640" height="80" fill="none" stroke={c.purple} strokeWidth="1.5" />
        <text x="40" y="55" fill={c.purple} fontSize="11" fontFamily="monospace" letterSpacing="1.5">LEVEL 1. original</text>
        <text x="40" y="82" fill={c.textBright} fontSize="16" fontFamily="serif" fontStyle="italic">"Can machines think?"</text>
        <text x="40" y="102" fill={c.textDim} fontSize="11" data-small="1">untestable. depends on contested definitions of "think"</text>

        <line x1="340" y1="115" x2="340" y2="150" stroke={c.yellow} strokeWidth="1.5" />
        <polygon points="340,150 335,144 345,144" fill={c.yellow} />
        <text x="355" y="138" fill={c.yellow} fontSize="10" fontFamily="monospace" data-small="1">replace ambiguous concept with observable behavior</text>

        <rect x="60" y="160" width="560" height="80" fill="none" stroke={c.accent} strokeWidth="1.5" />
        <text x="80" y="185" fill={c.accent} fontSize="11" fontFamily="monospace" letterSpacing="1.5">LEVEL 2. behavioral</text>
        <text x="80" y="212" fill={c.textBright} fontSize="15" fontFamily="serif" fontStyle="italic">"Are there imaginable digital computers that could play the imitation game?"</text>
        <text x="80" y="230" fill={c.textDim} fontSize="11" data-small="1">testable, but still asks about a whole class of machines</text>

        <line x1="340" y1="245" x2="340" y2="280" stroke={c.yellow} strokeWidth="1.5" />
        <polygon points="340,280 335,274 345,274" fill={c.yellow} />
        <text x="355" y="268" fill={c.yellow} fontSize="10" fontFamily="monospace" data-small="1">universality: all digital computers are equivalent</text>

        <rect x="100" y="290" width="480" height="90" fill="none" stroke={c.teal} strokeWidth="1.5" />
        <text x="120" y="315" fill={c.teal} fontSize="11" fontFamily="monospace" letterSpacing="1.5">LEVEL 3. specific</text>
        <text x="120" y="340" fill={c.textBright} fontSize="14" fontFamily="serif" fontStyle="italic">"Can this one computer C, given enough</text>
        <text x="120" y="358" fill={c.textBright} fontSize="14" fontFamily="serif" fontStyle="italic">storage, speed, and the right program, play?"</text>
        <text x="120" y="374" fill={c.textDim} fontSize="11" data-small="1">answerable by engineering. hardware + programming problem</text>
      </svg>
    </DiagramFrame>
  );
}

function SupplementRenderer({ supplement }) {
  switch (supplement.type) {
    case "imitation-diagram":
      return <ImitationGameDiagram />;
    case "computer-arch-diagram":
      return <ComputerArchDiagram />;
    case "universality-diagram":
      return <UniversalityDiagram />;
    default:
      return null;
  }
}

function Transfer({ children }) {
  return (
    <div style={{
      margin: "28px 0",
      padding: "16px 18px",
      borderLeft: `3px solid ${COLORS.teal}`,
      background: COLORS.teal + "10",
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: COLORS.teal,
        marginBottom: "10px",
      }}>
        ⟶ Transfer. connection to your work
      </div>
      <div style={{
        color: COLORS.text,
        fontSize: "14px",
        lineHeight: "1.65",
      }}>
        {children}
      </div>
    </div>
  );
}

function SectionInserts({ sectionId }) {
  switch (sectionId) {
    case "obj-consciousness":
      return (
        <Transfer>
          This is the core tension in verifiable compute, 76 years early. Behavioral equivalence ("the output is indistinguishable from what a trusted system would produce") is the imitation-game answer. That's what TEEs give you via remote attestation. Structural verification ("we can prove the computation was actually performed correctly, not just that outputs look right") is the third option Turing brushes past. That's what ZK gives you. EigenCompute sits in the TEE camp: you're betting that behavioral + hardware-rooted attestation is sufficient, and that the overhead of structural proof isn't worth it for most workloads. Turing would agree with that bet for the imitation game. Whether it generalizes to "thinking" is exactly the question.
        </Transfer>
      );
    case "learning":
      return (
        <Transfer>
          Turing's casual admission that "the teacher will often be very largely ignorant of quite what is going on inside" the learning machine is the agent opacity problem, stated in 1950. He frames it as natural, analogous to teaching a human student whose internal state you also can't inspect. Modern verifiable compute and interpretability research treats this as the problem to solve, not a feature. You're building infrastructure that sits on one side of this question: EigenCompute doesn't make the model's reasoning transparent, it makes the <em>fact of execution</em> verifiable. Turing's position implicitly supports that division of labor: behavioral or execution guarantees plus opaque internals is a coherent pairing, and has been for 76 years. The interpretability-first crowd is arguing against Turing, not just against you.
        </Transfer>
      );
    default:
      return null;
  }
}

function QuestionBlock({ question }) {
  const { key: apiKey, open: openKeyModal } = useApiKey();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);
  const [selfEvalMode, setSelfEvalMode] = useState(false);
  const [selfRating, setSelfRating] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!answer.trim() || loading) return;
    if (!apiKey) {
      setApiFailed(true);
      setErrorMessage("No Anthropic key set. Use the footer control to add one, or self-evaluate.");
      setSelfEvalMode(true);
      return;
    }
    setLoading(true);
    setFeedback(null);
    setApiFailed(false);
    setErrorMessage("");
    try {
      const text = await requestFeedback({ key: apiKey, question: question.prompt, answer });
      setFeedback(text);
      setSubmitted(true);
    } catch (e) {
      console.error("API error:", e);
      setApiFailed(true);
      setErrorMessage(
        e instanceof MissingApiKeyError
          ? "No Anthropic key set. Use the footer control to add one, or self-evaluate."
          : e?.message || "AI feedback unavailable. Self-evaluate instead."
      );
      setSelfEvalMode(true);
    }
    setLoading(false);
  };

  const handleSelfEval = () => {
    setSelfEvalMode(true);
  };

  const reset = () => {
    setSubmitted(false);
    setFeedback(null);
    setAnswer("");
    setShowHint(false);
    setApiFailed(false);
    setSelfEvalMode(false);
    setSelfRating(null);
    setErrorMessage("");
  };

  return (
    <div style={{
      border: `1px solid ${(submitted || selfRating) ? COLORS.teal + "44" : COLORS.border}`,
      padding: "20px",
      margin: "24px 0",
      background: COLORS.surface,
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: COLORS.yellow,
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{
          width: "6px", height: "6px",
          background: (submitted || selfRating) ? COLORS.teal : COLORS.yellow,
          display: "inline-block",
        }} />
        Active Recall
      </div>

      <p className="tr-question-prompt" style={{
        color: COLORS.textBright,
        fontSize: "15px",
        lineHeight: "1.65",
        margin: "0 0 16px 0",
      }}>
        {question.prompt}
      </p>

      {!showHint && !submitted && !selfEvalMode && (
        <button
          onClick={() => setShowHint(true)}
          className="tr-btn-link"
          style={{
            background: "none",
            border: "none",
            color: COLORS.textDim,
            fontSize: "13px",
            cursor: "pointer",
            padding: "0",
            marginBottom: "12px",
            textDecoration: "underline",
            textDecorationStyle: "dotted",
            textUnderlineOffset: "3px",
          }}
        >
          Show hint
        </button>
      )}

      {showHint && !submitted && !selfEvalMode && (
        <p style={{
          color: COLORS.purple,
          fontSize: "13px",
          lineHeight: "1.5",
          margin: "0 0 16px 0",
          padding: "10px 14px",
          borderLeft: `2px solid ${COLORS.purpleDim}`,
          background: COLORS.purpleDim + "18",
        }}>
          {question.hint}
        </p>
      )}

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        disabled={submitted || selfRating}
        className="tr-textarea"
        style={{
          width: "100%",
          minHeight: "100px",
          background: (submitted || selfRating) ? COLORS.bg + "88" : COLORS.bg,
          border: `1px solid ${COLORS.border}`,
          color: (submitted || selfRating) ? COLORS.textDim : COLORS.text,
          padding: "12px",
          fontSize: "14px",
          lineHeight: "1.6",
          fontFamily: "inherit",
          resize: "vertical",
          boxSizing: "border-box",
          outline: "none",
        }}
        onFocus={(e) => {
          if (!submitted && !selfRating) e.target.style.borderColor = COLORS.borderActive;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = COLORS.border;
        }}
      />

      {!submitted && !selfEvalMode && (
        <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || loading}
            className="tr-btn"
            style={{
              padding: "8px 20px",
              background: answer.trim() && !loading ? COLORS.accent : COLORS.border,
              color: answer.trim() && !loading ? "#fff" : COLORS.textDim,
              border: "none",
              fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
              fontSize: "12px",
              letterSpacing: "0.5px",
              cursor: answer.trim() && !loading ? "pointer" : "default",
              textTransform: "uppercase",
            }}
          >
            {loading ? "Evaluating..." : "AI Feedback"}
          </button>
          <button
            onClick={handleSelfEval}
            disabled={!answer.trim() || loading}
            className="tr-btn"
            style={{
              padding: "8px 20px",
              background: "none",
              color: answer.trim() && !loading ? COLORS.textDim : COLORS.border,
              border: `1px solid ${answer.trim() && !loading ? COLORS.border : COLORS.border + "44"}`,
              fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
              fontSize: "12px",
              letterSpacing: "0.5px",
              cursor: answer.trim() && !loading ? "pointer" : "default",
              textTransform: "uppercase",
            }}
          >
            Self-Evaluate
          </button>
          {!apiKey && (
            <button
              onClick={openKeyModal}
              className="tr-btn-link"
              style={{
                background: "none",
                border: "none",
                color: COLORS.textDim,
                fontSize: "11px",
                fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
                letterSpacing: "0.5px",
                cursor: "pointer",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
                textUnderlineOffset: "3px",
                padding: 0,
              }}
            >
              Set Anthropic key for AI feedback
            </button>
          )}
        </div>
      )}

      {feedback && (
        <div style={{
          marginTop: "16px",
          padding: "16px",
          borderLeft: `2px solid ${COLORS.teal}`,
          background: COLORS.teal + "10",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: COLORS.teal,
            marginBottom: "10px",
          }}>
            Feedback
          </div>
          <p style={{
            color: COLORS.text,
            fontSize: "14px",
            lineHeight: "1.65",
            margin: 0,
            whiteSpace: "pre-wrap",
          }}>
            {feedback}
          </p>
          <button onClick={reset} className="tr-btn tr-btn-small" style={{
            marginTop: "12px", padding: "6px 14px", background: "none",
            color: COLORS.textDim, border: `1px solid ${COLORS.border}`,
            fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
            fontSize: "11px", letterSpacing: "0.5px", cursor: "pointer",
            textTransform: "uppercase",
          }}>
            Try Again
          </button>
        </div>
      )}

      {selfEvalMode && !feedback && (
        <div style={{
          marginTop: "16px",
          padding: "16px",
          borderLeft: `2px solid ${COLORS.purple}`,
          background: COLORS.purpleDim + "12",
        }}>
          {apiFailed && errorMessage && (
            <p style={{
              color: COLORS.yellow,
              fontSize: "12px",
              fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
              margin: "0 0 12px 0",
            }}>
              {errorMessage}
            </p>
          )}
          <div style={{
            fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: COLORS.purple,
            marginBottom: "10px",
          }}>
            Self-Check
          </div>
          <p style={{
            color: COLORS.text,
            fontSize: "14px",
            lineHeight: "1.65",
            margin: "0 0 16px 0",
          }}>
            {question.hint}
          </p>
          <p style={{
            color: COLORS.textDim,
            fontSize: "13px",
            lineHeight: "1.5",
            margin: "0 0 16px 0",
          }}>
            Re-read your answer against the hint above. Be honest. Did you articulate the reasoning in your own words, or did you summarize without engaging? Rate yourself:
          </p>
          <div className="tr-rating-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { label: "Nailed it", value: "nailed", color: COLORS.teal },
              { label: "Partial", value: "partial", color: COLORS.yellow },
              { label: "Missed it", value: "missed", color: COLORS.purple },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelfRating(opt.value)}
                className="tr-btn tr-rating-btn"
                style={{
                  padding: "6px 16px",
                  background: selfRating === opt.value ? opt.color + "30" : "none",
                  color: selfRating === opt.value ? opt.color : COLORS.textDim,
                  border: `1px solid ${selfRating === opt.value ? opt.color : COLORS.border}`,
                  fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {selfRating && (
            <div style={{ marginTop: "12px" }}>
              <p style={{
                color: COLORS.textDim,
                fontSize: "13px",
                margin: "0 0 12px",
                lineHeight: "1.5",
              }}>
                {selfRating === "nailed"
                  ? "Nice. Move on, but come back in a few days and try this one cold."
                  : selfRating === "partial"
                  ? "Re-read the relevant section, then try articulating it again without looking."
                  : "That's fine. This is how learning works. Re-read the section slowly, then try again."}
              </p>
              <button onClick={reset} className="tr-btn tr-btn-small" style={{
                padding: "6px 14px", background: "none",
                color: COLORS.textDim, border: `1px solid ${COLORS.border}`,
                fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
                fontSize: "11px", letterSpacing: "0.5px", cursor: "pointer",
                textTransform: "uppercase",
              }}>
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProgressBar({ sections }) {
  const totalQ = sections.reduce((sum, s) => sum + s.questions.length, 0);
  return (
    <div
      className="tr-progress-bar-container"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "12px 0",
      }}
    >
      <div style={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
      }}>
        {sections.map((s, i) => {
          const isChecked = s.questions.length > 0;
          const qCount = s.questions.length;
          const baseColor = isChecked ? COLORS.yellow + "AA" : COLORS.textDim + "55";
          const tooltip = isChecked
            ? `${s.title} — ${qCount} ${qCount === 1 ? "question" : "questions"}`
            : `${s.title} — reading only`;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              title={tooltip}
              aria-label={tooltip}
              className="tr-progress-segment"
              onMouseEnter={(e) => {
                const bar = e.currentTarget.querySelector("span");
                if (bar) bar.style.background = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                const bar = e.currentTarget.querySelector("span");
                if (bar) bar.style.background = baseColor;
              }}
            >
              <span
                style={{
                  display: "block",
                  height: isChecked ? "8px" : "6px",
                  borderRadius: "3px",
                  background: baseColor,
                  transition: "background 0.2s",
                }}
              />
            </a>
          );
        })}
      </div>
      <div style={{
        fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
        fontSize: "10px",
        color: COLORS.textDim,
        marginTop: "6px",
        letterSpacing: "1px",
        textTransform: "uppercase",
      }}>
        {totalQ} comprehension checkpoints
        <span style={{ color: COLORS.border, margin: "0 6px" }}>|</span>
        {sections.length} sections
      </div>
    </div>
  );
}

export default function TuringReader() {
  useMobileStyles();
  return (
    <div
      className="tr-root"
      style={{
        background: COLORS.bg,
        color: COLORS.text,
        minHeight: "100vh",
        fontFamily: "'Charter', 'Georgia', 'Palatino', serif",
      }}
    >
      <div style={{ padding: "40px 0 24px" }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: COLORS.textDim,
          marginBottom: "12px",
        }}>
          A. M. Turing. 1950. Mind 49: 433-460
        </div>
        <h1 className="tr-h1" style={{
          fontSize: "28px",
          fontWeight: 400,
          color: COLORS.textBright,
          margin: "0 0 8px",
          lineHeight: 1.3,
        }}>
          Computing Machinery and Intelligence
        </h1>
        <p className="tr-intro-text" style={{
          fontSize: "14px",
          color: COLORS.textDim,
          margin: "12px 0 0",
          lineHeight: 1.6,
        }}>
          Interactive reading with active recall checkpoints. Answer questions after key sections to build understanding. Feedback is AI-evaluated when you add a key, otherwise self-evaluate against the hint. Yellow bars in the progress indicator mark sections with questions.
        </p>
      </div>

      <ProgressBar sections={SECTIONS} />

      {SECTIONS.map((section) => (
        <div key={section.id} id={section.id} style={{ paddingTop: "32px" }}>
          <h2 className="tr-section-h2" style={{
            fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
            fontSize: "14px",
            fontWeight: 600,
            color: COLORS.accent,
            margin: "0 0 20px",
            letterSpacing: "0.3px",
          }}>
            {section.title}
          </h2>

          {section.supplements?.map((s, i) => (
            <SupplementRenderer key={i} supplement={s} />
          ))}

          <div className="tr-body" style={{
            fontSize: "15.5px",
            lineHeight: "1.75",
            color: COLORS.text,
            whiteSpace: "pre-wrap",
          }}>
            {section.content}
          </div>

          <SectionInserts sectionId={section.id} />

          {section.questions.map((q) => (
            <QuestionBlock key={q.id} question={q} />
          ))}

          <div style={{
            borderBottom: `1px solid ${COLORS.border}`,
            margin: "32px 0 0",
          }} />
        </div>
      ))}

      <div className="tr-post-box" style={{
        marginTop: "48px",
        padding: "24px",
        border: `1px solid ${COLORS.border}`,
        background: COLORS.surface,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: COLORS.teal,
          marginBottom: "12px",
        }}>
          Post-Reading
        </div>
        <p style={{ fontSize: "15px", lineHeight: 1.7, margin: 0, color: COLORS.textBright }}>
          You've read the full paper. If you want to test retention later, come back and try the questions again without looking at the text. That's spaced retrieval, and it's the single most effective learning technique we know of. The questions are designed to go beyond recall into <em style={{ color: COLORS.yellow, fontStyle: "italic" }}>articulation</em>: if you can explain Turing's moves and evaluate them in your own words, you've internalized the ideas, not just memorized the claims.
        </p>
      </div>
    </div>
  );
}
